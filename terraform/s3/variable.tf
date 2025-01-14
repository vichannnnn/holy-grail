variable "app_name" {
  description = "Name of the app."
  type        = string
}

variable "BUCKET_DOMAIN_NAME" {
  description = "S3 Bucket Custom Domain Name"
  type        = string
}

variable "AWS_ACCESS_KEY" {
  description = "AWS Access key"
  type        = string
  sensitive   = true
}

variable "AWS_SECRET_KEY" {
  description = "AWS Secret key"
  type        = string
  sensitive   = true
}

variable "root_domain_name" {
  description = "Root Domain name"
  type        = string
}

