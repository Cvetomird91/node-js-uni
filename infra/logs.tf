resource "aws_cloudwatch_log_group" "bookstore_app_log_group" {
  name              = "/ecs/${var.ecs_service_name}-bookstore_app"
  retention_in_days = 30

  tags = {
    Name = "${var.ecs_service_name}-bookstore_app-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "bookstore_app_log_stream" {
  name           = "${var.ecs_service_name}-bookstore_app-log-stream"
  log_group_name = aws_cloudwatch_log_group.bookstore_app_log_group.name
}

resource "aws_cloudwatch_log_group" "bookstore_service_log_group" {
  name              = "/ecs/${var.ecs_service_name}-bookstore_service"
  retention_in_days = 30

  tags = {
    Name = "${var.ecs_service_name}-bookstore_service-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "bookstore_service_log_stream" {
  name           = "${var.ecs_service_name}-bookstore_service-log-stream"
  log_group_name = aws_cloudwatch_log_group.bookstore_service_log_group.name
}
