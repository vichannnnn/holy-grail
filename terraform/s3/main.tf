
provider "aws" {
  alias      = "us_east_1"
  access_key = var.AWS_ACCESS_KEY
  secret_key = var.AWS_SECRET_KEY
  region     = "us-east-1"

  default_tags {
    tags = {
      app = var.app_name
    }
  }
}


resource "aws_s3_bucket" "bucket" {
  bucket = "${var.app_name}-bucket"

  tags = {
    Name = var.app_name
  }
}

resource "aws_iam_user" "s3_user" {
  name = "${var.app_name}-s3-api-user"
  tags = {
    Name        = "${var.app_name} S3 API User"
    Environment = "production"
  }
}

resource "aws_iam_policy" "s3_access_policy" {
  name        = "${var.app_name}S3AccessPolicy"
  description = "Policy to allow access to the ${var.app_name} S3 bucket"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ],
        Effect   = "Allow",
        Resource = "${aws_s3_bucket.bucket.arn}/*"
      },
      {
        Action   = "s3:ListBucket",
        Effect   = "Allow",
        Resource = aws_s3_bucket.bucket.arn
      }
    ]
  })

  depends_on = [aws_s3_bucket.bucket]
}

resource "aws_iam_user_policy_attachment" "s3_user_policy_attachment" {
  user       = aws_iam_user.s3_user.name
  policy_arn = aws_iam_policy.s3_access_policy.arn
}


resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.bucket.arn}/*"
      },
      {
        Effect = "Allow",
        Principal = {
          AWS = aws_iam_user.s3_user.arn
        },
        Action   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
        Resource = "${aws_s3_bucket.bucket.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.bucket_public_access_block]
}



resource "aws_s3_bucket_public_access_block" "bucket_public_access_block" {
  bucket = aws_s3_bucket.bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

}


resource "aws_acm_certificate" "s3_bucket_certificate" {
  provider          = aws.us_east_1
  domain_name       = var.BUCKET_DOMAIN_NAME
  validation_method = "DNS"

  tags = {
    Name = "${var.app_name}-bucket-cert"
  }
}


resource "null_resource" "s3_bucket_dns_validation" {
  for_each = {
    for record in aws_acm_certificate.s3_bucket_certificate.domain_validation_options :
    record.domain_name => {
      name  = record.resource_record_name
      type  = record.resource_record_type
      value = record.resource_record_value
    }
  }

  provisioner "local-exec" {
    command = <<EOT
      ./porkbun.sh ${each.value.value} ${var.root_domain_name} ${replace(each.value.name, ".${var.root_domain_name}", "")}
    EOT
  }

  triggers = {
    always_run = timestamp()
  }

  depends_on = [aws_acm_certificate.s3_bucket_certificate]
}

resource "aws_acm_certificate_validation" "s3_bucket_certificate_validation" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.s3_bucket_certificate.arn

  validation_record_fqdns = [
    for record in aws_acm_certificate.s3_bucket_certificate.domain_validation_options :
    record.resource_record_name
  ]

  depends_on = [null_resource.s3_bucket_dns_validation]
}

resource "aws_cloudfront_distribution" "s3_bucket_cloudfront_distribution" {
  origin {
    domain_name = aws_s3_bucket.bucket.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.bucket.id}"

    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port              = 80
      https_port             = 443
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_200"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.bucket.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.s3_bucket_certificate.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = [var.BUCKET_DOMAIN_NAME]

  tags = {
    Name = "${var.app_name}-cloudfront-distribution"
  }

  depends_on = [aws_acm_certificate_validation.s3_bucket_certificate_validation]
}

resource "null_resource" "cloudfront_dns_setup" {
  provisioner "local-exec" {
    command = <<EOT
      ./porkbun.sh ${aws_cloudfront_distribution.s3_bucket_cloudfront_distribution.domain_name} ${var.root_domain_name} ${replace(var.BUCKET_DOMAIN_NAME, ".${var.root_domain_name}", "")}
    EOT
  }

  triggers = {
    always_run = timestamp()
  }

  depends_on = [aws_cloudfront_distribution.s3_bucket_cloudfront_distribution]
}

resource "null_resource" "post_destroy_cloudfront_script" {
  triggers = {
    root_domain_name = var.root_domain_name
    bucket_subdomain = replace(var.BUCKET_DOMAIN_NAME, ".${var.root_domain_name}", "")
    record_type      = "CNAME"
  }

  provisioner "local-exec" {
    command = "./porkbun_delete.sh ${self.triggers.root_domain_name} ${self.triggers.bucket_subdomain} ${self.triggers.record_type}"
    when    = destroy
  }

  depends_on = [
    aws_cloudfront_distribution.s3_bucket_cloudfront_distribution
  ]
}
