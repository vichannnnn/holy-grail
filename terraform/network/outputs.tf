output "vpc" {
  value = aws_vpc.app_alb
}

output "public_subnets" {
  value = aws_subnet.public_subnets
}