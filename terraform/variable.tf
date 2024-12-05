variable "region" {
  description = "AWS region to deploy the network to."
  type        = string
}

variable "app_name" {
  description = "Name of the app."
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

variable "backend_image_hash" {
  description = "Docker image hash"
  type        = string
}

variable "frontend_image_hash" {
  description = "Docker image hash"
  type        = string
}

variable "celery_image_hash" {
  description = "Docker image hash"
  type        = string
}

variable "backend_image" {
  description = "Backend Docker Image used to start the container. Should be in repository-url/image:tag format."
  type        = string
}

variable "frontend_image" {
  description = "Frontend Docker Image used to start the container. Should be in repository-url/image:tag format."
  type        = string
}

variable "celery_image" {
  description = "Celery Docker Image used to start the container. Should be in repository-url/image:tag format."
  type        = string
}

variable "frontend_subdomain_name" {
  description = "Frontend Domain name"
  type        = string
}

variable "backend_subdomain_name" {
  description = "Backend Domain name"
  type        = string
}

variable "root_domain_name" {
  description = "Root Domain name"
  type        = string
}

variable "github_username" {
  description = "Github Username"
  type        = string
}

variable "github_personal_access_token" {
  description = "Github Personal Access Token"
  type        = string
}

variable "POSTGRES_DB" {
  type      = string
  sensitive = true
}

variable "POSTGRES_PASSWORD" {
  type      = string
  sensitive = true
}

variable "POSTGRES_USER" {
  type      = string
  sensitive = true
}

variable "POSTGRES_HOST" {
  description = "The RDS endpoint to connect ECS tasks"
  type        = string
}

variable "ACCESS_TOKEN_EXPIRE_MINUTES" {
  description = "Token expiration time in minutes."
  type        = string
}

variable "ALGORITHM" {
  description = "Algorithm used for token generation."
  type        = string
}

variable "SECRET_KEY" {
  description = "Secret key for encryption or token signing."
  type        = string
  sensitive   = true
}

variable "AWS_CLOUDFRONT_URL" {
  description = "AWS CloudFront distribution URL."
  type        = string
}

variable "S3_BUCKET_NAME" {
  description = "Name of the S3 bucket."
  type        = string
}

variable "S3_KEY" {
  description = "Key for accessing S3 bucket."
  type        = string
  sensitive   = true
}

variable "S3_KEY_ID" {
  description = "ID for accessing S3 bucket."
  type        = string
  sensitive   = true
}

variable "PRODUCTION" {
  description = "Production flag (true/false)."
  type        = string
}

variable "LOGFIRE_TOKEN" {
  description = "Logfire token"
  type        = string
  sensitive   = true
}

variable "MAILTRAP_API_KEY" {
  description = "Mailtrap API Key"
  type        = string
  sensitive   = true
}

variable "MAILTRAP_BEARER_TOKEN" {
  description = "Mailtrap Bearer Token"
  type        = string
  sensitive   = true
}

variable "REDIS_URL" {
  description = "Redis URL"
  type        = string
}

variable "REDIS_BROKER_URL" {
  description = "Redis Broker URL"
  type        = string
}

variable "BUCKET_DOMAIN_NAME" {
  description = "S3 Bucket Custom Domain Name"
  type        = string
}