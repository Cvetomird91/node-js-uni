resource "aws_ecs_cluster" "main" {
  name = "${var.ecs_service_name}-cluster"
}

resource "aws_ecs_task_definition" "bookstore" {
  family                   = "${var.ecs_service_name}-bookstore-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  cpu                      = var.bookstore_service_fargate_cpu + var.bookstore_app_fargate_cpu
  memory                   = var.bookstore_service_fargate_memory + var.bookstore_app_fargate_memory
  container_definitions    = jsonencode(
    [
      {
        name = "bookstore_app"
        image = data.aws_ecr_repository.bookstore_app_repository.repository_url
        cpu = var.bookstore_app_fargate_cpu
        memory = var.bookstore_app_fargate_memory
        networkMode = "awsvpc"
        portMappings = [
          {
            containerPort = var.bookstore_app_port
            hostPort = var.bookstore_app_port
          }
        ]
      },
      {
        name = "bookstore_service"
        image = data.aws_ecr_repository.bookstore_service_repository.repository_url
        cpu = var.bookstore_service_fargate_cpu
        memory = var.bookstore_service_fargate_memory
        networkMode = "awsvpc"
        portMappings = [
          {
            containerPort = var.bookstore_service_port
            hostPort = var.bookstore_service_port
          }
        ]
      }
    ]
  )
}

resource "aws_ecs_service" "bookstore" {
  name            = "${var.ecs_service_name}-bookstore"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.bookstore.arn
  desired_count   = var.bookstore_app_count
  launch_type     = "EC2"

  network_configuration {
    security_groups  = [aws_security_group.bookstore_app_task.id, aws_security_group.bookstore_service_task.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.bookstore_alb.id
    container_name   = "bookstore_app"
    container_port   = var.bookstore_app_port
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.graphql_alb.id
    container_name   = "bookstore_service"
    container_port   = var.bookstore_service_port
  }

  depends_on = [ aws_alb_listener.bookstore_app_listener, aws_iam_role_policy_attachment.ecs_task_execution_role ]
}