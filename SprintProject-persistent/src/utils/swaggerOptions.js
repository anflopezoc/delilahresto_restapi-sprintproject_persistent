const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Delilah Restó -Project Sprint 1 Acámica",
            version: "1.0.0",
            description: "Proyecto de Rest-API para Sprint 1 de Acámica"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server"
            }
        ],
        components: {
            securitySchemes: {
                basicAuth: {
                    type: "http",
                    scheme: "basic"
                }
            }
        },
        security: [

        ]
    },
    apis: ["./src/routes/*.js"]
};

module.exports = swaggerOptions;
