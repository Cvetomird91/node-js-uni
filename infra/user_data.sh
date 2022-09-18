#!/bin/bash

# Update all packages

sudo yum update -y

#Adding cluster name in ecs config
echo ECS_CLUSTER=bookstore-cluster >> /etc/ecs/ecs.config
cat /etc/ecs/ecs.config | grep "ECS_CLUSTER"
