terraform {
  cloud {

    organization = "himari-sg"

    workspaces {
      name = "holy-grail-development"
    }
  }
}

provider "aws" {
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  region     = var.region

  default_tags {
    tags = {
      app = var.app_name
    }
  }
}

module "network" {
  source = "./network"
}

module "rds" {
  source            = "./rds"
  POSTGRES_DB       = var.POSTGRES_DB
  POSTGRES_PASSWORD = var.POSTGRES_PASSWORD
  POSTGRES_USER     = var.POSTGRES_USER
  app_name          = var.app_name
  region            = var.region
}

module "s3" {
  source             = "./s3"
  app_name           = var.app_name
  BUCKET_DOMAIN_NAME = var.BUCKET_DOMAIN_NAME
  aws_access_key     = var.aws_access_key
  aws_secret_key     = var.aws_secret_key
  root_domain_name   = var.root_domain_name
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
  depends_on                   = [module.network]

  POSTGRES_DB       = var.POSTGRES_DB
  POSTGRES_PASSWORD = var.POSTGRES_PASSWORD
  POSTGRES_USER     = var.POSTGRES_USER
  POSTGRES_HOST     = module.rds.rds_endpoint


  ACCESS_TOKEN_EXPIRE_MINUTES    = var.ACCESS_TOKEN_EXPIRE_MINUTES
  ALGORITHM                      = var.ALGORITHM
  AWS_CLOUDFRONT_URL             = var.AWS_CLOUDFRONT_URL
  PRODUCTION                     = var.PRODUCTION
  S3_BUCKET_NAME                 = var.S3_BUCKET_NAME
  S3_KEY                         = var.S3_KEY
  S3_KEY_ID                      = var.S3_KEY_ID
  SECRET_KEY                     = var.SECRET_KEY
  LOGFIRE_TOKEN                  = var.LOGFIRE_TOKEN
  MAILTRAP_API_KEY               = var.MAILTRAP_API_KEY
  MAILTRAP_BEARER_TOKEN          = var.MAILTRAP_BEARER_TOKEN
  GOOGLE_APPLICATION_CREDENTIALS = var.GOOGLE_APPLICATION_CREDENTIALS
  GOOGLE_APPLICATION_PROPERTY_ID = var.GOOGLE_APPLICATION_PROPERTY_ID
  CELERY_BROKER_URL              = var.CELERY_BROKER_URL
  CELERY_RESULT_BACKEND          = var.CELERY_RESULT_BACKEND
}
