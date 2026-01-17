resource "aws_security_group" "opensearch" {
  count  = var.opensearch_enabled && var.vpc_id != "" ? 1 : 0
  name   = "${var.app_name}-opensearch-sg"
  vpc_id = var.vpc_id

  ingress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [var.ecs_security_group_id]
    description     = "Allow HTTPS from ECS"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.app_name}-opensearch-sg"
  }
}

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

  advanced_security_options {
    enabled                        = true
    internal_user_database_enabled = true
    master_user_options {
      master_user_name     = var.opensearch_master_user
      master_user_password = var.opensearch_master_password
    }
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

  dynamic "vpc_options" {
    for_each = var.vpc_id != "" ? [1] : []
    content {
      subnet_ids         = [var.subnet_ids[0]]
      security_group_ids = [aws_security_group.opensearch[0].id]
    }
  }

  tags = {
    Name = "${var.app_name}-opensearch"
  }
}

data "aws_caller_identity" "current" {}
