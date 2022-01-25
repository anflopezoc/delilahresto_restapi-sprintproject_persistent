# Delilah Restó API Order Guide.
***Sprint Project 3. (My APP Live)***

## What does this API allow to do?
Users can register on this API to order from Delilah Restó. This has restricted access in some routes or paths for only administrator users.

## What is the technologies used in this API?
This API has created in NodeJS Javascript with the Express JS framework NodeJS, MariaDB and Sequelize ORM for database, Mocha-Chai for testing, Redis as CACHE technology and Swagger documentation (APi 3.0).

In addition, this API is hosted in the AWS cloud through the EC2 service and with access from the following domain: https://www.anflopezoc.ga

## The tech reviwer IAM user 

The Tech Reviewer can access to IAM user accout in AWS With the following information: 

>IdUser: 244812671501
>username: Tech_Reviewer 
>password: anflopezoc@123

This  AWS IAM user have the **IAMUserChangePassword** and **ReadOnlAccess** permissions polocies (i).


## The cloud AWS services usedes in the API's architecture.

In the **Diagram 1**, you can view the used AWS Architecture for the Sprint Project 3 (My APP Live) and yours two integration with the gitlab and github repository.


**Diagram 1. AWS Architecture Diagram** - 
![AWS Architecture Diagram](https://anflopezoc.ga/Images/AWS+Architecture+Diagram+-+Sprint+Project+3.jpg)


## What is the AWS services used in this Project?


### 1. EC2 Instance:
hosting the API in the EC2 instance (d), in the us-east-1 region, with the Ubuntu Server 20.04 LTS and the t2.micro type instance.

As seen in the diagram 1, here found two instance:
 1. Instance for AMI: is the EC2 instanc with only acces with the device developer IP with from ssh (22) port. With this EC2 instance create the IAM (n) and Launch Template asociated with the Auto Scaling Group service.  

 2. Instance A: is the EC2 instance create with the IAM and Launch Template asociated with the Auto Scaling Group. This has a temporary security group with the ssh port accessible from anywhere and others port 

 The instance A have **continius integration** (l) with the master branch from this GitHub repository through the CodeDeploy service and have relation with the target group and load balancer. 

### 2. Elastic Load Balancer (c):
Instance A registers with the target group over port 443 with the health check setting starting at an interval of 60 seconds (j).

The load balancer configuration listens for HTTPS: 443 with the ACM www.anflopezoc.ga 

### 3. Autoscaling 
The infraestructure have a launch configuration and the Auto Scaling Group (13) related to the launc template and AMI from Sprint Project and the following configuration:

**Table 1. Auto Scaling Capacity**
| Capacity | Q |
|--|--|
| Desired | 1 |
| Minimum | 1 |
| Maximum | 2 | 

### Route 53

Here have a hostedzone with the domain anflopezoc.ga with two register:
- www.anflopezoc.ga with alias loadbalancer https 
- anflopezoc.ga with alias cloudfront 

These register have been certified in AWS Certificate Management (a).

### RDS

This project have a RDS instance from MariaDB with (f) the free tier.

### Amazon ElastiCache 

This project use Amazon ElastiCache for Redis service (p) supported with cache.t2.micro node type.

### S3 bucket + CloudFront 

The project have the s3 bucket with index.html, style.css and folders integrated with a [Gitlab repository](https://gitlab.com/anflopezoc/sprintproject3-cicd-s3). In addition, there is a Cloudfront distribution service with connection to this bucket and the anflopezoc.ga certificate.


### CI/CD

The project have two integration (i) (see Diagram 1):

1. Integration with a [Gitlab repository](https://gitlab.com/anflopezoc/sprintproject3-cicd-s3) and S3.

2. Integration with the master branch from this [Github repository](https://github.com/anflopezoc/delilahresto_restapi-sprintproject_persistent/tree/master/SprintProject-persistent) trough the AWS CodeDeploy service with application configuration and code pipeline between the github repository and EC2 instance A or instances created by the Autoscaling Group.
Each instance has a Agent CodeDeploy and the EC2CodeDeploy role (watch in AIM Role).


## EC2 instance Access

If you have a .pem file relationated with the instance, you can access to the bash console of the following way:

- In Windows PowerShell and from directory with the .pem file:
    `ssh -i /path/my-key-pair.pem ubuntu@my-instance-public-dns-name`

- In Bash from WSL (Windows) or Linux
    `sudo ssh -i /path/my-key-pair.pem ubuntu@my-instance-public-dns-name`

Example:

`sudo ssh -i /home/ubuntu/download/Sprint3.pem ubuntu@34.236.243.106`


If the connection to the bash console from the instance is successful, you can view the pm2 process with the `pm2 list` command and view the API files with the following command:

`cd /home/ubuntu/sprintproject3/SprintProject-persistent`


## About API 

In the API documentation in Swagger you can see seven routes, in these routes has been resolved:

### Account 
In this route, users can register and log into the account. The user must log in to get the token to use in Orders, User_addresses (One Path), Products (One Path) and Paymenth Methods (One Path) routes.

### Users
***(Only access to the Admin User)***
This is the users management route, here the admin user can create, update, inactive and see all users registred and active in Delilah Resto. Here a non-admin user cannot have access.

### User_Addresses
This is the user address management route. Here users can add, update, delete, and view all user addresses.

### Products
***(Some paths have only access to the Admin User)***
This is the product management route. Admin user can add, update, delete and view all products. Non-admin users only have access to the ***'/allproducts'*** path so they can see all products in Delilah Resto ofert. 

### Payment_methods
***(Some paths have only access to the Admin User)***
This is the payment method managment route. Admin user can add, update, delete and view all payment methods. Non-admin users only have acces to the ***'/allpayments'*** pathe so they can see all payment methods avaliable for orders in Delilah Resto.

### Orders
This is the route for orders at Delilah Resto. All users can add and remove the products, add an address to ship and confirm the order in pending status, also the user can see all the orders created by himself.

***Note: The user does not need to create an order, they will always have an order in pending status to be used***

### Order_Managment
***(Only access to the Admin User)***
This is the orders managment route at Delilah Resto. In this route, the admin user can change the status of the orders, but cannot change an order in pending status or return to the pending status of an order already confirmed.

Thanks for review this API!

API created by:


**Andrés Felipe López Ochoa**
>  Backend Developer
>  email: anflopezoc@gmail.com
>  LinkedIn: https://www.linkedin.com/in/anflopezoc/
