# node-js-uni

A back-end NodeJS application created with GraphQL Apollo server, ExpressJS and MongoDB.
Infrastructure is deployed to AWS ECS using `Terraform`. For more information, please, check the `infra`directory.
The MongoDB schema and sample data can be found in `db-schema` in the mongoexport format.

# Infrastructure

The project uses `Terraform` to describe and make changes to AWS infrastructure. AWS technologies used:

- Elastic container registrey
- Elastic container service running on EC2 on t3a.medium instances
- Application load balancer with various target groups
- AWS Cloudwatch
- Public and private subnets with EC2 NAT instances 
