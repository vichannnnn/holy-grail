variable "app_name" {
  description = "Name of the app."
  type        = string
}

variable "BUCKET_DOMAIN_NAME" {
  description = "S3 Bucket Custom Domain Name"
  type        = string
}

variable "aws_access_key" {
  description = "AWS Access key"
  type        = string
  sensitive   = true
}

variable "aws_secret_key" {
  description = "AWS Secret key"
  type        = string
  sensitive   = true
}

variable "root_domain_name" {
  description = "Root Domain name"
  type        = string
}

