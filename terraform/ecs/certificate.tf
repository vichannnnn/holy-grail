resource "aws_acm_certificate" "app_alb" {
  domain_name               = "*.${var.root_domain_name}"
  subject_alternative_names = ["${var.frontend_subdomain_name}.${var.root_domain_name}", "${var.backend_subdomain_name}.${var.root_domain_name}"]
  validation_method         = "DNS"

  tags = {
    Name = "${var.app_name}-cert"
  }
}

resource "null_resource" "app_alb_dns_validation" {
  for_each = {
    for record in aws_acm_certificate.app_alb.domain_validation_options :
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

  depends_on = [aws_acm_certificate.app_alb]
}

resource "aws_acm_certificate_validation" "app_alb" {
  certificate_arn = aws_acm_certificate.app_alb.arn

  validation_record_fqdns = [
    for record in aws_acm_certificate.app_alb.domain_validation_options :
    record.resource_record_name
  ]
}

