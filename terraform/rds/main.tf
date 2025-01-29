
resource "aws_security_group" "rds_sg" {
  name_prefix = "${var.app_name}-rds-sg"

  ingress {
    description = "Allow PostgreSQL traffic from anywhere"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.app_name
  }
}


resource "aws_db_instance" "postgres" {
  engine                 = "postgres"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  db_name                = var.POSTGRES_DB
  username               = var.POSTGRES_USER
  password               = var.POSTGRES_PASSWORD
  publicly_accessible    = true
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true

  tags = {
    Name = var.app_name
  }
}
