# ALB Security Group: Edit to restrict access to the application
resource "aws_security_group" "lb" {
  name        = "${var.ecs_service_name}-load-balancer-security-group"
  description = "controls access to the ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    protocol    = "tcp"
    from_port   = var.bookstore_app_port
    to_port     = var.bookstore_app_port
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "bookstore_app_task" {
  name        = "${var.ecs_service_name}_app-task-security-group"
  description = "allow inbound access to the bookstore_app task from the ALB only"
  vpc_id      = aws_vpc.main.id

  ingress {
    protocol        = "tcp"
    from_port       = var.bookstore_app_port
    to_port         = var.bookstore_app_port
    security_groups = [aws_security_group.lb.id]
    cidr_blocks     = [aws_vpc.main.cidr_block]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "bookstore_service_task" {
  name        = "${var.ecs_service_name}_service-task-security-group"
  description = "allow inbound access to the Application task from the ALB only"
  vpc_id      = aws_vpc.main.id

  ingress {
    protocol        = "tcp"
    from_port       = var.bookstore_app_port
    to_port         = var.bookstore_service_port
    security_groups = [aws_security_group.lb.id]
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}