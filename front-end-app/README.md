docker build -t bookstore-frontend:latest .
docker tag bookstore-frontend:latest 341871682637.dkr.ecr.eu-central-1.amazonaws.com/bookstore-service:latest
docker push 341871682637.dkr.ecr.eu-central-1.amazonaws.com/bookstore-service:latest

docker build -t bookstore:latest .
docker tag bookstore:latest 341871682637.dkr.ecr.eu-central-1.amazonaws.com/bookstore-application:latest
docker push 341871682637.dkr.ecr.eu-central-1.amazonaws.com/bookstore-application:latest

ecs deploy bookstore-cluster bookstore-bookstore --tag latest