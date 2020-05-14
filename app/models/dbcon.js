const mysql = require("mysql");
const dbConnection = require("../config/dbconfig.js");

// Initiate a connection to the database
const connection = mysql.createConnection({
  host: dbConnection.HOST,
  user: dbConnection.USER,
  password: dbConnection.PASSWORD,
  database: dbConnection.DB
});

// open connection to MySQL
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;