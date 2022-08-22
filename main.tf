provider "aws" {
  version = "~> 2.0"
  region  = "eu-central-1" # Setting my region to London. Use your own region here
}

resource "aws_ecr_repository" "bookstore_ecs_repository" {
  name = "bookstore_ecs_repository" # Naming my repository
}
