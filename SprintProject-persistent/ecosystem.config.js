module.exports = {
    apps: [{
        name: "api",
        script: "./src/server.js",
        watch: true,
        env_local:{
            "NODE_ENV": "local",
            "API_DESCRIPTION": "This Application is running in development mode"
        },
        env_production:{
            "NODE_ENV": "prduction",
            "API_DESCRIPTION": "This application is running in production mode. Take care!"
        }
    }]
};
