# Delilah Restó API Order Guide.
***Sprint Project 3. (My APP Live)***

This is Sprint Project 3 (My APP Live), about creating the cloud architecture needed for the app.

## What does this API allow us to do?
Users can register on this API to order from Delilah Restó. This has restricted access to some routes or paths to only administrator users.

## What are the technologies used in this API?
This API was created in NodeJS Javascript with the Express JS framework,NodeJS, MariaDB and Sequelize ORM for database, Mocha-Chai for testing, Redis as CACHE technology and Swagger documentation (APi 3.0).

In addition, this API is hosted in the AWS cloud through the EC2 service and with access from the following URL: https://www.api.anflopezoc.ga/swagger

## The tech reviewer IAM user 

The Tech Reviewer can access the IAM user account in AWS with the following information:

>IdUser: 244812671501
>username: Tech_Reviewer 
>password: anflopezoc@123

This AWS IAM user is granted the **IAMUserChangePassword** and **ReadOnlyAccess** permissions(i).

## The AWS cloud services are used in the API architecture.

In **Diagram 1**, you can see the used AWS Architecture for Sprint Project 3 (My APP Live) and its two integrations with the gitlab and github repository.


**Diagram 1. AWS Architecture Diagram** - 
![AWS Architecture Diagram](https://bucket.anflopezoc.ga/Images/AWS+Architecture+Diagram+-+Sprint+Project+3.jpg)


## What are the AWS services used in this project?


### 1. EC2 Instance:
This is API hosts the on the EC2 instance (d), in the us-east-1 region, with Ubuntu Server 20.04 LTS and the t2.micro type instance.

As seen in the diagram 1, there are two  instance:
 1. Instance for AMI: This is the EC2 instance that can only be accessed via the ssh port (22) with the developer device IP.Using this EC2 instance, create the IAM(n) and Launch Template associated with the Auto Scaling Group service.

 2. Instance A: This is the EC2 instance created with the IAM and Launch Template associated with the Auto Scaling Group. This has a temporary security group with the ssh port accessible from anywhere and other ports.

 Instance A have **continius integration** (l) with the master branch from this GitHub repository through the CodeDeploy service and have relation with the target group and load balancer. 

### 2. Elastic Load Balancer (c):
Instance A registers with the target group over port 80 with the health check setting starting at an interval of 60 seconds (j).

The load balancer configuration listens for HTTPS: 443 with the ACM anflopezoc.ga, www.anflopezoc.ga and api.anflopezoc.ga

### 3. Autoscaling 
The infrastructure includes a launch configuration and the Auto Scaling Group (13) associated with the Sprint Project's launch template and AMI, as well as the following configuration: configuración:

**Table 1. Auto Scaling Capacity**
| Capacity | Q |
|--|--|
| Desired | 1 |
| Minimum | 1 |
| Maximum | 2 | 

### Route 53

Here have a hostedzone with the domain anflopezoc.ga with two register:
- anflopezoc.ga with alias loadbalancer https
- bucket.anflopezoc.ga with alias cloudfront 

These register have been certified in AWS Certificate Management (a).

### RDS
This project uses an RDS instance from MariaDB with (f) the free tier.

### Amazon ElastiCache 

This project uses Amazon ElastiCache for Redis service (p) supported by the cache.t2.micro node type.

### S3 bucket + CloudFront 

The project has the s3 bucket with a index.html, style.css and folders integrated with a [Gitlab repository](https://gitlab.com/anflopezoc/sprintproject3-cicd-s3). In addition, there is a Cloudfront distribution service with a connection to this bucket and the anflopezoc.ga cerificate.


### CI/CD

The project have two integration (i) (see Diagram 1):

1. Integration with a [Gitlab repository](https://gitlab.com/anflopezoc/sprintproject3-cicd-s3) and S3.

2. Integration with the master branch og this [Github repository](https://github.com/anflopezoc/delilahresto_restapi-sprintproject_persistent/tree/master/SprintProject-persistent) through the AWS CodeDeploy service with application configuration and code pipeline between the Github repository and EC2 instance A or instances created by the Autoscaling Group.
Each instance has an Agent CodeDeploy and the EC2CodeDeploy role (watch in AIM Role).


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


# About API 

## The Admin User Access.

The administrator user has access to all routes with email and password of the following JSON:

`{ email: 'admin@delilah.com' password: 'AdminUser123' }`

## Routes

You can access the API through the following url:

    https://www.api.anflopezoc.ga/swagger/

In the API documentation in Swagger you can see seven routes, in these routes has been resolved:

### Account 
On this route, users can register and log in to their account. The user must log in to get the token to use in orders, user_addresses (One Path), products (One Path), and payment methods (One Path) routes.

### Users
***(Only access to the Admin User)***
This is the user management route. Here the admin user can create, update, inactive, and see all users registered and active in Delilah Resto. Here, a non-admin user cannot have access.

### User_Addresses
This is the user address management route. Here, users can add, update, delete, and view all user addresses.

### Products
***(Some paths have only access to the Admin User)***
This is the product management route. An admin user can add, update, delete, and view all products. Non-admin users only have access to the ***'/allproducts'*** path, so they can see all products in the Delilah Resto shop. 

### Payment_methods
***(Some paths have only access to the Admin User)***
This is the payment method management route. An admin user can add, update, delete, and view all payment methods. Non-admin users only have access to the ***'/allpayments'*** pathe so they can see all the payment methods available for orders in Delilah Resto.

### Orders
This is the route for orders at Delilah Resto. All users can add and remove products, add an address to ship to, and confirm the order in pending status. The user can also see all the orders created by himself.

***Note: The user does not need to create an order, they will always have an order in pending status to be used***

### Order_Managment
***(Only access to the Admin User)***
This is the order management route at Delilah Resto. In this route, the admin user can change the status of the orders, but cannot change the status of an order in pending status or return to the pending status of an order already confirmed.

Thanks for reviewing this sprint project!

by:


**Andrés Felipe López Ochoa**
>  Backend Developer
>  email: anflopezoc@gmail.com
>  LinkedIn: https://www.linkedin.com/in/anflopezoc/
