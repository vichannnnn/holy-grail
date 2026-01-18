terraform {
  cloud {
    organization = "himari-sg"
    workspaces {
      name = "holy-grail-production"
    }
  }
}

provider "aws" {
  access_key = var.AWS_ACCESS_KEY
  secret_key = var.AWS_SECRET_KEY
  region     = var.region

  default_tags {
    tags = {
      app = var.app_name
    }
  }
}

module "network" {
  source   = "./network"
  app_name = var.app_name
}

module "rds" {
  source            = "./rds"
  POSTGRES_DB       = var.POSTGRES_DB
  POSTGRES_PASSWORD = var.POSTGRES_PASSWORD
  POSTGRES_USER     = var.POSTGRES_USER
  app_name          = var.app_name
}

module "s3" {
  source             = "./s3"
  app_name           = var.app_name
  BUCKET_DOMAIN_NAME = var.BUCKET_DOMAIN_NAME
  AWS_ACCESS_KEY     = var.AWS_ACCESS_KEY
  AWS_SECRET_KEY     = var.AWS_SECRET_KEY
  root_domain_name   = var.root_domain_name
}

module "opensearch" {
  source                     = "./opensearch"
  app_name                   = var.app_name
  region                     = var.region
  opensearch_enabled         = var.opensearch_enabled
  opensearch_instance_type   = var.opensearch_instance_type
  opensearch_volume_size     = var.opensearch_volume_size
  opensearch_master_user     = var.opensearch_master_user
  opensearch_master_password = var.opensearch_master_password
}

module "ecs" {
  source   = "./ecs"
  app_name = var.app_name
  region   = var.region

  backend_image       = var.backend_image
  frontend_image      = var.frontend_image
  celery_image        = var.celery_image
  backend_image_hash  = var.backend_image_hash
  frontend_image_hash = var.frontend_image_hash
  celery_image_hash   = var.celery_image_hash

  backend_subdomain_name  = var.backend_subdomain_name
  frontend_subdomain_name = var.frontend_subdomain_name
  root_domain_name        = var.root_domain_name

  github_username              = var.github_username
  github_personal_access_token = var.github_personal_access_token
  vpc                          = module.network.vpc
  vpc_id                       = module.network.vpc.id
  public_subnet_ids            = [for s in module.network.public_subnets : s.id]
  alb_security_group_id        = module.network.alb_security_group_id
  ecs_security_group_id        = module.network.ecs_security_group_id
  depends_on                   = [module.network]

  POSTGRES_DB       = var.POSTGRES_DB
  POSTGRES_PASSWORD = var.POSTGRES_PASSWORD
  POSTGRES_USER     = var.POSTGRES_USER
  POSTGRES_HOST     = module.rds.rds_endpoint

  ACCESS_TOKEN_EXPIRE_MINUTES = var.ACCESS_TOKEN_EXPIRE_MINUTES
  ALGORITHM                   = var.ALGORITHM
  AWS_CLOUDFRONT_URL          = var.AWS_CLOUDFRONT_URL
  PRODUCTION                  = var.PRODUCTION
  AWS_S3_BUCKET_NAME          = var.AWS_S3_BUCKET_NAME
  SECRET_KEY                  = var.SECRET_KEY
  LOGFIRE_TOKEN               = var.LOGFIRE_TOKEN
  MAILTRAP_API_KEY            = var.MAILTRAP_API_KEY
  MAILTRAP_BEARER_TOKEN       = var.MAILTRAP_BEARER_TOKEN
  CELERY_BROKER_URL           = var.CELERY_BROKER_URL
  CELERY_RESULT_BACKEND       = var.CELERY_RESULT_BACKEND
  AWS_ACCESS_KEY              = var.AWS_ACCESS_KEY
  AWS_SECRET_KEY              = var.AWS_SECRET_KEY

  OPENSEARCH_HOST     = module.opensearch.opensearch_endpoint
  OPENSEARCH_ENABLED  = module.opensearch.opensearch_enabled
  OPENSEARCH_USER     = var.opensearch_master_user
  OPENSEARCH_PASSWORD = var.opensearch_master_password
  OPENSEARCH_PORT     = 443
  OPENSEARCH_USE_SSL  = true
}
