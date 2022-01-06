const { config } =require('dotenv');
config()

exports.module ={
    PORT: process.env.PORT,
    SIGNATUREJWT: process.env.SIGNATUREJWT,
    DBURL: process.env.DBURL,
    DB_host: process.env.DB_HOST,
    DB_port: process.env.DB_PORT,
    DB_user: process.env.DB_USER,
    DB_password: process.env.DB_PASSWORD,
    DB_database: process.env.DB_DATABASE, 
    ADMINUSER: process.env.ADMINUSER,
    ADMINPASSWORD: process.env.ADMINPASSWORD,
    REDISURL: process.env.REDISURL
}