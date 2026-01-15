output "opensearch_endpoint" {
  description = "OpenSearch domain endpoint."
  value       = var.opensearch_enabled ? aws_opensearch_domain.main[0].endpoint : ""
}

output "opensearch_domain_arn" {
  description = "OpenSearch domain ARN."
  value       = var.opensearch_enabled ? aws_opensearch_domain.main[0].arn : ""
}

output "opensearch_enabled" {
  description = "Whether OpenSearch is enabled."
  value       = var.opensearch_enabled
}
