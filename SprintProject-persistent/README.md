# Delilah Restó API Order Guide.
***Sprint Project 2.***

## What does this API allow to do?
Users can register on this API to order from Delilah Restó. This has restricted access in some routes or paths for only administrator users.

## What is the technologies used in this API?
This API has created in NodeJS Javascript with the Express JS framework NodeJS, MariaDB(MySQL) and Sequelize ORM for database, Mocha-Chai for testing, Redis as CACHE technology and Swagger (APi 3.0) documentation.

## How to init the API?
a) First, you need to install the following programs in order to run this API:

    -NodeJS
    -MariaDB
    -Redis

b)  clone or download this repository with the fllowing url:
>https://github.com/anflopezoc/delilahresto_restapi-sprintproject_persistent.git


c) You need to create the .env in the Backend-homework folder. The .env file can use the following settings:

    PORT=3000
    DB_HOST='127.0.0.1'
    DB_PORT='3306'
    DB_USER='root'
    DB_PASSWORD='root'
    DB_DATABASE='sprintproject_anflopezoc'
    SIGNATUREJWT='SignatureDelilahanflopezocPassword'
    ADMINPASSWORD='AdminUser123'
    ADMINUSER='admin@delilah.com'
    REDISURL='6379'

The .env file settings can be created based on your preferences and settings on the PC for API review, MariaDB and Redis.

***Note: this API has designed for the create the database with rund 'npm run start', tables and registers default, you don't need to run an SQL query in MariaDB.***

d) Now, you need to install the API libraries with the following command:

    npm install

e) If the API libraries have been installed successfully, you can run the API with the following commands:

    npm run start
     
Or

    npm run dev 

This API has unit tests on the account path. You can run API unit tests with the following commands:

    npm run test

***Note: before running unit tests, you must run the API (npm run dev or npm run start) to avoid unit tests failures.***

The server API is running when you can see in terminall "Server in Port 3000" and "DB connection has been established successfully."

If the sercer conections is succesfull, you can review the API in the following URL:

    http://localhost:3000/swagger/

## The Admin User Access.

The administrator user has access to all routes with email and password of the following JSON:

>{
>email: 'admin@delilah.com'
>password: 'AdminUser123'
>}

## The Routes

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
