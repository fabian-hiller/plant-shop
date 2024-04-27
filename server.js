// Import dependencies
const express = require("express");
const db = require("./database");

// Setup express app
const app = express();
app.use(express.static("public"));
app.listen(3000, () => console.log("http://localhost:3000"));

// API routes go here

// 1. Get All Products

app.get('/products', function (req, res) {
	let query = 'select distinct plant.plantid, plantname, imageurl, price from plant, plantsize where plant.plantid=plantsize.plantid AND plantsize="small"';
	db.query(query, function (error, results, fields) {
		if (error) {
			res.status(500).send('Internal Error');
		} else {
			res.json(results);
		}
	});
});
