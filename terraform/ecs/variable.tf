variable "app_name" {
  description = "Name of the app."
  type        = string
}

variable "region" {
  description = "AWS region for deployment."
  type        = string
}

variable "backend_image_hash" {
  description = "Hash of the backend Docker image."
  type        = string
}

variable "frontend_image_hash" {
  description = "Hash of the frontend Docker image."
  type        = string
}

variable "celery_image_hash" {
  description = "Hash of the Celery Docker image."
  type        = string
}

variable "backend_image" {
  description = "Full backend Docker image path (repository-url/image:tag)."
  type        = string
}

variable "frontend_image" {
  description = "Full frontend Docker image path (repository-url/image:tag)."
  type        = string
}

variable "celery_image" {
  description = "Full Celery Docker image path (repository-url/image:tag)."
  type        = string
}

variable "frontend_subdomain_name" {
  description = "Frontend subdomain name."
  type        = string
}

variable "backend_subdomain_name" {
  description = "Backend subdomain name."
  type        = string
}

variable "root_domain_name" {
  description = "Root domain name."
  type        = string
}

variable "vpc" {
  description = "VPC where the ECS will be hosted."
}

variable "vpc_id" {
  description = "ID of the VPC where the ECS will be hosted."
  type        = string
}

variable "public_subnet_ids" {
  description = "IDs of public subnets where the ALB will be attached to."
  type        = list(string)
}

variable "github_username" {
  description = "Github Username."
  type        = string
}

variable "github_personal_access_token" {
  description = "Github Personal Access Token."
  type        = string
}

variable "POSTGRES_DB" {
  description = "PostgreSQL database name."
  type        = string
  sensitive   = true
}

variable "POSTGRES_USER" {
  description = "PostgreSQL username."
  type        = string
  sensitive   = true
}

variable "POSTGRES_PASSWORD" {
  description = "PostgreSQL password."
  type        = string
  sensitive   = true
}

variable "POSTGRES_HOST" {
  description = "The RDS endpoint for PostgreSQL."
  type        = string
}

variable "ACCESS_TOKEN_EXPIRE_MINUTES" {
  description = "Expiration time for access tokens in minutes."
  type        = string
}

variable "ALGORITHM" {
  description = "Algorithm used for cryptographic operations like token signing."
  type        = string
}

variable "SECRET_KEY" {
  description = "Secret key for encryption or signing tokens."
  type        = string
  sensitive   = true
}

variable "AWS_CLOUDFRONT_URL" {
  description = "CloudFront distribution URL."
  type        = string
}

variable "AWS_ACCESS_KEY" {
  description = "AWS Access Key ID."
  type        = string
  sensitive   = true
}

variable "AWS_SECRET_KEY" {
  description = "AWS Secret Access Key."
  type        = string
  sensitive   = true
}

variable "AWS_S3_BUCKET_NAME" {
  description = "Name of the S3 bucket."
  type        = string
}

variable "MAILTRAP_BEARER_TOKEN" {
  description = "Bearer token for Mailtrap API."
  type        = string
  sensitive   = true
}

variable "MAILTRAP_API_KEY" {
  description = "API key for Mailtrap."
  type        = string
  sensitive   = true
}

variable "PRODUCTION" {
  description = "Flag indicating if the application is running in production mode."
  type        = string
}

variable "LOGFIRE_TOKEN" {
  description = "Token for Logfire logging services."
  type        = string
  sensitive   = true
}

variable "CELERY_RESULT_BACKEND" {
  description = "Redis URL"
  type        = string
}

variable "CELERY_BROKER_URL" {
  description = "Redis URL"
  type        = string
}