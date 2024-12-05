variable "app_name" {
  description = "Name of the app."
  type        = string
}

variable "region" {
  description = "AWS region to deploy the network to."
  type        = string
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
  description = "Github Username"
  type        = string
}

variable "github_personal_access_token" {
  description = "Github Personal Access Token"
  type        = string
}

variable "POSTGRES_DB" {
  type = string
}

variable "POSTGRES_HOST" {
  description = "The RDS endpoint to connect ECS tasks"
  type        = string
}

variable "POSTGRES_PASSWORD" {
  type = string
}

variable "POSTGRES_USER" {
  type = string
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
}

variable "S3_KEY_ID" {
  description = "ID for accessing S3 bucket."
  type        = string
}

variable "PRODUCTION" {
  description = "Production flag (true/false)."
  type        = string
}

variable "LOGFIRE_TOKEN" {
  description = "Logfire token"
  type        = string
}

variable "REDIS_URL" {
  type = string
}

variable "REDIS_BROKER_URL" {
  type = string
}

variable "MAILTRAP_BEARER_TOKEN" {
  type = string
}

variable "MAILTRAP_API_KEY" {
  type = string
}