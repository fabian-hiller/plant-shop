const mysql = require("mysql");

/* To create connection*/
const connection = mysql.createConnection({
  host: "localhost",
  user: "plantshop",
  password: "plantshop",
  database: "plant_shop_database",
});

/* To connect to MySQL*/
connection.connect((err) => {
  if (err) {
    console.error("Error - Database connection failed." + err.stack);
    return;
  }
  console.log("Successfully connected to the database!");
});

module.exports = connection;
