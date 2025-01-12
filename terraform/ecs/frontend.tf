
resource "aws_ecs_task_definition" "frontend" {

  family                   = "frontend-task"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512

  container_definitions = jsonencode([
    {
      name  = "frontend"
      image = "${var.frontend_image}:${var.frontend_image_hash}"
      repositoryCredentials = {
        credentialsParameter = aws_secretsmanager_secret.ghcr_token.arn
      }
      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]
      essential = true
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/aws/ecs/${var.app_name}/cluster"
          awslogs-region        = var.region
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "frontend" {
  name            = "${var.app_name}-frontend-service"
  cluster         = aws_ecs_cluster.app_alb.name
  launch_type     = "FARGATE"
  desired_count   = 1
  task_definition = aws_ecs_task_definition.frontend.arn

  network_configuration {
    subnets          = var.public_subnet_ids
    assign_public_ip = true
    security_groups  = [aws_security_group.ecs.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend.arn
    container_name   = "frontend"
    container_port   = 3000
  }

  lifecycle {
    ignore_changes = [
      desired_count,
    ]
  }

  depends_on = [
    aws_lb_target_group.frontend,
    aws_lb_listener_rule.frontend_rule
  ]
}

resource "aws_lb_target_group" "frontend" {
  name        = "${var.app_name}-frontend-tg-${substr(uuid(), 0, 3)}"
  vpc_id      = var.vpc_id
  port        = 3000
  protocol    = "HTTP"
  target_type = "ip"

  health_check {
    port                = 3000
    path                = "/"
    interval            = 30
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
    matcher             = 200
  }

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [var.vpc]
}

resource "aws_lb_listener_rule" "frontend_rule" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 20
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
  condition {
    host_header {
      values = ["${var.frontend_subdomain_name}.${var.root_domain_name}"]
    }
  }

  depends_on = [aws_lb_target_group.frontend, aws_lb_listener.https]
}

resource "null_resource" "post_apply_frontend_script" {
  provisioner "local-exec" {
    # ALB domain, root domain, subdomain
    command = "./porkbun.sh ${aws_lb.app_alb.dns_name} ${var.root_domain_name} ${var.frontend_subdomain_name}"
  }

  depends_on = [
    aws_lb.app_alb,
    aws_ecs_service.frontend
  ]
}