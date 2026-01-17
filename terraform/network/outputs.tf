output "vpc" {
  value = aws_vpc.app_alb
}

output "public_subnets" {
  value = aws_subnet.public_subnets
}

output "alb_security_group_id" {
  description = "ALB security group ID."
  value       = aws_security_group.alb.id
}

output "ecs_security_group_id" {
  description = "ECS security group ID."
  value       = aws_security_group.ecs.id
}