
resource "aws_ecs_task_definition" "backend" {
  family                   = "backend-task"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  network_mode             = "awsvpc"
  cpu                      = 1024 # Adjust based on your requirements
  memory                   = 2048 # Adjust based on your requirements

  container_definitions = jsonencode([
    {
      name    = "backend"
      image   = "${var.backend_image}:${var.backend_image_hash}"
      command = ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"]
      repositoryCredentials = {
        credentialsParameter = aws_secretsmanager_secret.ghcr_token.arn
      }
      portMappings = [
        {
          containerPort = 8000
          protocol      = "tcp"
        }
      ]
      environment = [
        { name = "FRONTEND_URL", value = "${var.frontend_subdomain_name}.${var.root_domain_name}" },
        { name = "BACKEND_URL", value = "${var.backend_subdomain_name}.${var.root_domain_name}" },
        { name = "GOOGLE_APPLICATION_PROPERTY_ID", value = var.GOOGLE_APPLICATION_PROPERTY_ID },
        { name = "GOOGLE_APPLICATION_CREDENTIALS", value = var.GOOGLE_APPLICATION_CREDENTIALS },
        { name = "CELERY_BROKER_URL", value = var.CELERY_BROKER_URL },
        { name = "CELERY_RESULT_BACKEND", value = var.CELERY_RESULT_BACKEND },
        { name = "POSTGRES_DB", value = var.POSTGRES_DB },
        { name = "POSTGRES_USER", value = var.POSTGRES_USER },
        { name = "POSTGRES_PASSWORD", value = var.POSTGRES_PASSWORD },
        { name = "POSTGRES_HOST", value = var.POSTGRES_HOST },
        { name = "DATABASE_URL", value = "postgresql+asyncpg://${var.POSTGRES_USER}:${var
        .POSTGRES_PASSWORD}@${var.POSTGRES_HOST}:5432/${var.POSTGRES_DB}" },
        { name = "TASK_RUNNER_DATABASE_URL", value = "postgresql://${var.POSTGRES_USER}:${var
        .POSTGRES_PASSWORD}@${var.POSTGRES_HOST}:5432/${var.POSTGRES_DB}" },
        { name = "ACCESS_TOKEN_EXPIRE_MINUTES", value = var.ACCESS_TOKEN_EXPIRE_MINUTES },
        { name = "ALGORITHM", value = var.ALGORITHM },
        { name = "SECRET_KEY", value = var.SECRET_KEY },
        { name = "AWS_CLOUDFRONT_URL", value = var.AWS_CLOUDFRONT_URL },
        { name = "AWS_S3_BUCKET_NAME", value = var.S3_BUCKET_NAME },
        { name = "AWS_S3_ACCESS_KEY_ID", value = var.S3_KEY_ID },
        { name = "AWS_S3_SECRET_ACCESS_KEY", value = var.S3_KEY },
        { name = "AWS_CLOUDFRONT_URL", value = var.S3_KEY },
        { name = "MAILTRAP_BEARER_TOKEN", value = var.MAILTRAP_BEARER_TOKEN },
        { name = "MAILTRAP_API_KEY", value = var.MAILTRAP_API_KEY },
        { name = "PRODUCTION", value = var.PRODUCTION },
        { name = "LOGFIRE_TOKEN", value = var.LOGFIRE_TOKEN }
      ]
      essential = true
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/aws/ecs/${var.app_name}/cluster"
          awslogs-region        = var.region
          awslogs-stream-prefix = "backend"
        }
      }
    },
    {
      name    = "celery"
      image   = "${var.celery_image}:${var.celery_image_hash}"
      command = ["celery", "-A", "worker", "worker", "-B", "--loglevel=info"]
      repositoryCredentials = {
        credentialsParameter = aws_secretsmanager_secret.ghcr_token.arn
      }
      environment = [
        { name = "CELERY_BROKER_URL", value = var.CELERY_BROKER_URL },
        { name = "CELERY_RESULT_BACKEND", value = var.CELERY_RESULT_BACKEND },
        { name = "MAILTRAP_BEARER_TOKEN", value = var.MAILTRAP_BEARER_TOKEN },
        { name = "MAILTRAP_API_KEY", value = var.MAILTRAP_API_KEY },
      ]
      essential = true
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/aws/ecs/${var.app_name}/cluster"
          awslogs-region        = var.region
          awslogs-stream-prefix = "celery"
        }
      }
    },
    {
      name    = "redis"
      image   = "redis:7.0.7-alpine"
      command = ["redis-server", "--loglevel", "verbose"]
      portMappings = [
        {
          containerPort = 6379
          protocol      = "tcp"
        }
      ]
      essential = false
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/aws/ecs/${var.app_name}/cluster"
          awslogs-region        = var.region
          awslogs-stream-prefix = "redis"
        }
      }
    }
  ])
}


resource "aws_ecs_service" "backend" {
  name            = "${var.app_name}-backend-service"
  cluster         = aws_ecs_cluster.app_alb.name
  task_definition = aws_ecs_task_definition.backend.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = var.public_subnet_ids
    assign_public_ip = true
    security_groups  = [aws_security_group.ecs.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend.arn
    container_name   = "backend"
    container_port   = 8000
  }

  depends_on = [aws_lb_listener_rule.backend_rule]
}


resource "aws_lb_target_group" "backend" {
  name        = "${var.app_name}-backend-tg"
  vpc_id      = var.vpc_id
  port        = 8000
  protocol    = "HTTP"
  target_type = "ip"

  health_check {
    port                = 8000
    path                = "/hello"
    interval            = 30
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
    matcher             = 200
  }


  depends_on = [var.vpc]
}

resource "aws_lb_listener_rule" "backend_rule" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 10
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }
  condition {
    host_header {
      values = ["${var.backend_subdomain_name}.${var.root_domain_name}"]
    }
  }
  depends_on = [aws_lb_target_group.backend, aws_lb_listener.https]
}

resource "null_resource" "post_apply_backend_script" {
  depends_on = [
    aws_lb.app_alb,
    aws_ecs_service.backend
  ]

  provisioner "local-exec" {
    # ALB domain, root domain, subdomain
    command = "./porkbun.sh ${aws_lb.app_alb.dns_name} ${var.root_domain_name} ${var.backend_subdomain_name}"
  }

  triggers = {
    always_run = timestamp()
  }
}