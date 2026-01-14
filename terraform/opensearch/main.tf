resource "aws_opensearch_domain" "main" {
  count = var.opensearch_enabled ? 1 : 0

  domain_name    = "${var.app_name}-search"
  engine_version = "OpenSearch_2.11"

  cluster_config {
    instance_type  = var.opensearch_instance_type
    instance_count = 1
  }

  ebs_options {
    ebs_enabled = true
    volume_size = var.opensearch_volume_size
    volume_type = "gp3"
  }

  node_to_node_encryption {
    enabled = true
  }

  encrypt_at_rest {
    enabled = true
  }

  domain_endpoint_options {
    enforce_https       = true
    tls_security_policy = "Policy-Min-TLS-1-2-2019-07"
  }

  access_policies = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = "es:*"
        Resource  = "arn:aws:es:${var.region}:${data.aws_caller_identity.current.account_id}:domain/${var.app_name}-search/*"
      }
    ]
  })

  tags = {
    Name = "${var.app_name}-opensearch"
  }
}

data "aws_caller_identity" "current" {}
