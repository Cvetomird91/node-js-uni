resource "aws_alb" "main" {
  name            = "${var.ecs_service_name}-load-balancer"
  subnets         = aws_subnet.public.*.id
  security_groups = [aws_security_group.lb.id]
}

resource "aws_alb_target_group" "bookstore_alb" {
  name        = "${var.ecs_service_name}-target-group"
  port        = var.bookstore_app_port
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "2"
    interval            = "5"
    protocol            = "HTTP"
    matcher             = "200,202,304"
    timeout             = "4"
    path                = "/"
    port                = 80
    unhealthy_threshold = "10"
  }
}

# Redirect all traffic from the ALB to the target group
resource "aws_alb_listener" "bookstore_app_listener" {
  load_balancer_arn = aws_alb.main.id
  port              = var.bookstore_app_port
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.bookstore_alb.id
    type             = "forward"
  }
}

resource "aws_alb_target_group" "graphql_alb" {
  name        = "graphql-target-group"
  port        = var.bookstore_service_port
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "2"
    interval            = "5"
    protocol            = "HTTP"
    matcher             = "200,202,304,404,400"
    timeout             = "4"
    port                = 3000
    path                = "/graphql"
    unhealthy_threshold = "10"
  }

}

resource "aws_alb_listener_rule" "graphql" {
  listener_arn = aws_alb_listener.bookstore_app_listener.arn
  priority     = 99

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.graphql_alb.arn
  }

  condition {
    path_pattern {
      values = ["/graphql"]
    }
  }

}

output "load_balancer_ip" {
  value = aws_alb.main.dns_name
}
