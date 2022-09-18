data "aws_iam_policy_document" "ecs_agent" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_agent" {
  name               = "ecs-agent"
  assume_role_policy = data.aws_iam_policy_document.ecs_agent.json
}


resource "aws_iam_role_policy_attachment" "ecs_agent" {
  role       = aws_iam_role.ecs_agent.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "ecs_agent" {
  name = "ecs-agent"
  role = aws_iam_role.ecs_agent.name
}

resource "aws_launch_configuration" "ecs_launch_config" {
  image_id             = "ami-094d4d00fd7462815"
  iam_instance_profile = aws_iam_instance_profile.ecs_agent.name
  security_groups      = [aws_security_group.lb.id]
  user_data            = "${file("user_data.sh")}"
  instance_type        = var.instance_type_spot
  spot_price           = var.spot_bid_price
}

resource "aws_autoscaling_group" "ecs_instance_asg" {
  name                      = "asg"
  vpc_zone_identifier       = aws_subnet.private[*].id
  launch_configuration      = aws_launch_configuration.ecs_launch_config.name

  desired_capacity          = 2
  min_size                  = 1
  max_size                  = 10
  health_check_grace_period = 300
  health_check_type         = "EC2"
}