// creates the connection to the server
require("dotenv").config()
var mysql = require("mysql");

// Could not get it to connect to the .env file works if you hard code all information
var connection = mysql.createConnection({
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: "ecommerce",
  host: process.env.DB_HOST,
  port: "3306",
});

// Connect to the database
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Export connection
module.exports = connection;