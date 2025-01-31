resource "aws_acm_certificate" "frontend_app_alb" {
  domain_name       = var.frontend_subdomain_name != "NONE" ? "${var.frontend_subdomain_name}.${var.root_domain_name}" : var.root_domain_name
  validation_method = "DNS"

  tags = {
    Name = "${var.app_name}-frontend-cert"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "backend_app_alb" {
  domain_name = var.backend_subdomain_name != "NONE" ? "${var.backend_subdomain_name}.${var.root_domain_name}" : "api.${var.root_domain_name}"

  validation_method = "DNS"

  tags = {
    Name = "${var.app_name}-backend-cert"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "null_resource" "frontend_dns_validation" {
  for_each = {
    for record in aws_acm_certificate.frontend_app_alb.domain_validation_options :
    record.domain_name => {
      name  = record.resource_record_name
      type  = record.resource_record_type
      value = record.resource_record_value
    }
  }

  provisioner "local-exec" {
    command = <<EOT
      ./porkbun.sh "${each.value.value}" "${var.root_domain_name}" ${replace(each.value.name, ".${var.root_domain_name}", "")}
    EOT
  }

  depends_on = [aws_acm_certificate.frontend_app_alb]
}

resource "null_resource" "backend_dns_validation" {
  for_each = {
    for record in aws_acm_certificate.backend_app_alb.domain_validation_options :
    record.domain_name => {
      name  = record.resource_record_name
      type  = record.resource_record_type
      value = record.resource_record_value
    }
  }

  provisioner "local-exec" {
    command = <<EOT
      ./porkbun.sh "${each.value.value}" "${var.root_domain_name}" ${replace(each.value.name, ".${var.root_domain_name}", "")}
    EOT
  }

  depends_on = [aws_acm_certificate.backend_app_alb]
}

resource "aws_acm_certificate_validation" "frontend_validation" {
  certificate_arn = aws_acm_certificate.frontend_app_alb.arn

  validation_record_fqdns = [
    for record in aws_acm_certificate.frontend_app_alb.domain_validation_options :
    record.resource_record_name
  ]

  depends_on = [null_resource.frontend_dns_validation]
}

resource "aws_acm_certificate_validation" "backend_validation" {
  certificate_arn = aws_acm_certificate.backend_app_alb.arn

  validation_record_fqdns = [
    for record in aws_acm_certificate.backend_app_alb.domain_validation_options :
    record.resource_record_name
  ]

  depends_on = [null_resource.backend_dns_validation]
}

