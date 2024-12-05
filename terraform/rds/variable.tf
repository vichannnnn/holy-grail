variable "app_name" {
  description = "Name of the app."
  type        = string
}

variable "region" {
  description = "AWS region to deploy the network to."
  type        = string
}

variable "POSTGRES_DB" {
  type = string
}

variable "POSTGRES_PASSWORD" {
  type = string
}

variable "POSTGRES_USER" {
  type = string
}
