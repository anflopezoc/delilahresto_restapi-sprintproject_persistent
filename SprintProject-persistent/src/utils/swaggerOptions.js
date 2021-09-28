const config = require('../config/config').module;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Delilah Restó- Sprint Project 2 Acámica with DB",
            version: "2.0.0",
            description: "REST API for orders of Delilah Restó users made with Node JS and MariaDB"
        },
        servers: [
            {
                url: "http://localhost:3000",
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
                description: "User management route (Only Admin User)"
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
