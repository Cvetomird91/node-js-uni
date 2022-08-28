data "aws_ecr_repository" "bookstore_app_repository" {
  name = "bookstore-application"
}

data "aws_ecr_repository" "bookstore_service_repository" {
  name = "bookstore-service"
}
