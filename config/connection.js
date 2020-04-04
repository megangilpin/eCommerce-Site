// creates the connection to the server
require("dotenv").config();
const mysql = require("mysql");

// Could not get it to connect to the .env file works if you hard code all information
const connection = mysql.createConnection({
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

// Connect to the database
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

// Export connection
module.exports = connection;