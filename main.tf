provider "aws" {
  version = "~> 2.0"
  region  = "eu-central-1" # Setting my region to London. Use your own region here
}

resource "aws_ecr_repository" "bookstore_ecs_repository" {
  name = "bookstore_ecs_repository" # Naming my repository
}

resource "aws_ecs_cluster" "bookstore_ecs_cluster" {
  name = "bookstore_ecs_cluster" # Naming the cluster
}

resource "aws_ecs_task_definition" "bookstore_ecs_task" {
  family 						= "bookstore_ecs_task"
  container_definitions 		= <<DEFINITION
  [
    {
      "name": "bookstore_ecs_task",
      "image": "${aws_ecr_repository.bookstore_ecs_repository.repository_url}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000
        }
      ],
      "memory": 512,
      "cpu": 256
    }
  ]
  DEFINITION
  requires_compatibilities = ["EC2"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = "${aws_iam_role.ecsTaskExecutionRole.arn}"
}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = "${data.aws_iam_policy_document.assume_role_policy.json}"
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = "${aws_iam_role.ecsTaskExecutionRole.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
