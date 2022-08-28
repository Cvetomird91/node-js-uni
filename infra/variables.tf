variable "aws_region" {
  description = "The AWS region things are created in"
  default     = "eu-central-1"
}

variable "aws_profile" {
  description = "The AWS profile to use"
  default     = "default"
}

variable "ecs_service_name" {
  default = "bookstore"
}

variable "az_count" {
  description = "Number of AZs to cover in a given region"
  default     = 2
}

variable "ecs_task_execution_role_name" {
  description = "ECS task execution role name"
  default = "bookstoreEcsTaskExecutionRole"
}

variable "ecs_auto_scale_role_name" {
  description = "ECS auto scale role Name"
  default = "bookstoreEcsAutoScaleRole"
}

variable "bookstore_service_port" {
  description = "backend service port"
  default = 3000
}

variable "bookstore_app_port" {
  description = "backend service port"
  default = 80
}

variable "bookstore_service_fargate_cpu" {
  description = "Fargate instance CPU units to provision for bookstore app (1 vCPU = 1024 CPU units)"
  default     = 256
}

variable "bookstore_service_fargate_memory" {
  description = "Fargate instance memory to provision for NGINX (in MiB)"
  default     = 512
}

variable "bookstore_app_fargate_cpu" {
  description = "Fargate instance CPU units to provision for back-end application (1 vCPU = 1024 CPU units)"
  default     = 256
}

variable "bookstore_app_fargate_memory" {
  description = "Fargate instance memory to provision for back-end application (in MiB)"
  default     = 512
}

variable "bookstore_app_count" {
  description = "Number of app containers to run"
  default     = 2
}