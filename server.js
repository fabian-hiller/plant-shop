// Import dependencies
const express = require("express");

// Setup express app
const app = express();
app.use(express.static("public"));
app.listen(3000, () => console.log("http://localhost:3000"));

// API routes go here
