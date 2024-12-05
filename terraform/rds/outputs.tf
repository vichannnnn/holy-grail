output "rds_endpoint" {
  value = split(":", aws_db_instance.postgres.endpoint)[0]

  description = "RDS endpoint without the port"
}