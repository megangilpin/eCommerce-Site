require("dotenv").config()
const mysql = require("mysql");

const connection = mysql.createPool({
    connectLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER, 
    database: "ecommerce",
    host: process.env.DB_HOST,
    port: "3306",
});

let userdb = {}; 

userdb.all = (callback) => {
    connection.query(`SELECT * FROM users`, callback)
};

module.exports = userdb;