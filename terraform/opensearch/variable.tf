variable "app_name" {
  description = "Name of the application."
  type        = string
}

variable "region" {
  description = "AWS region for deployment."
  type        = string
}

variable "opensearch_enabled" {
  description = "Enable OpenSearch deployment."
  type        = bool
  default     = false
}

variable "opensearch_instance_type" {
  description = "OpenSearch instance type. t3.small.search is free tier eligible."
  type        = string
  default     = "t3.small.search"
}

variable "opensearch_volume_size" {
  description = "EBS volume size in GB. Free tier includes 10GB."
  type        = number
  default     = 10
}

variable "opensearch_master_user" {
  description = "Master username for OpenSearch FGAC"
  type        = string
  default     = "admin"
}

variable "opensearch_master_password" {
  description = "Master password for OpenSearch FGAC"
  type        = string
  sensitive   = true
  default     = ""
}
