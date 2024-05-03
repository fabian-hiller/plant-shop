// Import dependencies
const mysql = require("mysql");

// Connect to MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_DATABASE || "plant_shop_database",
});

// Log database connection status
db.connect((error) => {
  if (error) {
    console.error("Database Error:", error.sqlMessage);
  } else {
    console.log("Successfully connected to the database!");
  }
});

// Export database connection
module.exports = db;
