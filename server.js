// Import dependencies
const express = require("express");
const db = require("./database");

// Setup express app
const app = express();
app.use(express.static("public"));
app.listen(3000, () => console.log("http://localhost:3000"));

// Setup SessionID and Cookies
var genuuid = require('uuid/v4');
const session = require('express-session');

// API routes go here

// 1. Get All Products

app.get('/products', function (req, res) {
	let query = 'select distinct plant.PlantId, PlantName, ImageURL, price as "StartPrice" from plant, plantsize where plant.plantid=plantsize.plantid AND plantsize="small"';
	db.query(query, function (error, results, fields) {
		if (error) {
			res.status(500).send('Internal Error');
		} else {
			res.json(results);
		}
	});
});

// 2. Get Product Details

app.get('/products/:productid', function (req, res) {
	const id = req.params['productid'];
	let query = 'select plantname, plantsize, price from plant, plantsize where plantsize.plantid=plant.plantid AND plant.plantid=' + id;
	db.query(query, function (error, results, fields) {
		if (error) {
			res.status(500).send('Internal Error');
		} else {
			res.json(results);
		}
	});
});

// 3. Add Product to Cart

app.post('/cart/items', function (req, res) {
	// Get PlantId from the URL query parameter
	const urlParams = new URLSearchParams(window.location.search);
	const plantId = parseInt(urlParams.get("id"));
	console.log(urlParams);
	console.log(plantId);
	
	let query1 = 'select distinct plant.PlantId, PlantName, ImageURL, price as "StartPrice" from plant, plantsize where plant.plantid=plantsize.plantid AND plantsize="small"';
	db.query1(query1, function (error, results, fields) {
		if (error) {
			res.status(500).send('Internal Error');
		} else {
			const plantList = res.json(result);
		}
	});
	
	// if plantid is same as the plant id in the platlist
	const desiredPlant = plantList.find((plant) => plant.PlantId === plantId);
	// get
	if (desiredPlant) {
		console.log(desiredPlant.PlantName);
		// Set plant name and start price
		plantItem.querySelector("h2").textContent = desiredPlant.PlantName;
		plantItem.querySelector("p").textContent =
			Available from $${desiredPlant.StartPrice};
		// Set plant image
		plantItem.querySelector("img").src = desiredPlant.ImageURL;
		plantItem.querySelector("img").alt = ${desiredPlant.PlantName} plant;
	} else {
		console.log(Plant with PlantId ${plantId} not found.);
	}
	
	const size = req.params['size'];
	let query2 = 'select plantname, plantsize, price from plant, plantsize where plantsize.plantid=plant.plantid AND plant.plantid=' + plantId + ' AND plantsize="small"';
	db.query2(query2, function (error, results, fields) {
		if (error) {
			res.status(500).send('Internal Error');
		} else {
			res.json(results);
			res.send("Was Added to the Cart");
		}
	});
});
			
	
// 4. Get Cart Details

app.get('/cart/items', function (req, res) {
	const id = req.params['productid'];
	let query = 'select plantname, plantsize, price from plant, plantsize where plantsize.plantid=plant.plantid AND plant.plantid=' + id;
	db.query(query, function (error, results, fields) {
		if (error) {
			res.status(500).send('Internal Error');
		} else {
			res.json(results);
		}
	});
});

// 5. Remove Item from Cart
	
	
// 6. error

app.get('/error', function (req, res) {
	res.set("Content-Type", "text/plain");
	res.status(400).send('Error, Bad Request!');
});

// 7. Generate Session id
app.use(session({
	genid: function (req) {
		return genuuid()
	},
	secret: '
