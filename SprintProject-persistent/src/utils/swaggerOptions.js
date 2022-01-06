const config = require('../config/config').module;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Delilah Restó- Sprint Project 2 Acámica with DB",
            version: "2.0.0",
            description: "REST API for orders of Delilah Restó users made with Node JS and MariaDB in AWS's cloud"
        },
        servers: [
            {
                url: "../",
                description: "Local server"
            }
        ],
        tags: [
            {
                name: "Account",
                description: "Signin and login route."
            },
            {
                name: "Users",
                description: "User management route (Only access to the Admin User)"
            },
            {
                name: "User_Addresses",
                description: "User addresses management route"
            },
            {
                name: "Products",
                description: "Route for managing the offer of products in Delilah Resto, only access to the Administrator User (Note: any user can see the path of all products)"
            },
            {
                name: "Payment_Methods",
                description: "Route for managing the payment methods for orders only access to the Administrator User (Note: any user can see the path of all payements methods)."
            },
            {
                name: "Orders",
                description: "Route for orders in Delilah Resto. In this route, users can add and remove the products in the order, add an address to ship, confirm the order, and view the historical orders related to the user."
            },
            {
                name: "Order_Managment",
                description: "Route for magment orders in Delilah Resto (Only access to the Admin User)."
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [

        ]
    },
    apis: ["./src/routes/*.js", "./components.yaml"]
};

module.exports = swaggerOptions;
