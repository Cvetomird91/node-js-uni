data "aws_ami" "al2_ami" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }
  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

resource "aws_instance" "NatInstance" {
  count          = var.az_count
  ami                         = data.aws_ami.al2_ami.id
  instance_type               = "t2.micro"
  subnet_id                   = element(aws_subnet.public.*.id, count.index)
  associate_public_ip_address = "true"
  source_dest_check           = "false"
  vpc_security_group_ids      = [aws_security_group.nat_instance_sg.id]
  user_data                   = <<EOF
#!/bin/bash
sudo sysctl -w net.ipv4.ip_forward=1
sudo /sbin/iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo service sshd stop
sudo systemctl stop rpcbind
  EOF

  tags = {
    Name = "NatInstance"
  }
}