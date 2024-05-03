// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const session = require("express-session");
const db = require("./database");

// Setup express app
const app = express();
app.use(express.static("public"));
app.listen(3000, () => console.log("Website URL: http://localhost:3000"));

// Setup express session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "HAW9b7PAtB",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 2.592e9 }, // 30 days
  })
);

// Get all plants
app.get("/plants", (_, res) => {
  db.query(
    'SELECT Plant.PlantID, PlantName, ImageURL, Price as "StartPrice" from Plant, PlantSize WHERE Plant.PlantID=PlantSize.PlantID AND PlantSize="small"',
    (error, results) => {
      if (error) {
        res.status(500).send("Internal Error");
      } else {
        res.json(results);
      }
    }
  );
});

// Get plant details
app.get("/plants/:PlantID", function (req, res) {
  const id = req.params["PlantID"];
  let query =
    "select plantname, plantsize, price from plant, plantsize where plantsize.plantid=plant.plantid AND plant.plantid=" +
    id;
  db.query(query, function (error, results, fields) {
    if (error) {
      res.status(500).send("Internal Error");
    } else {
      if (results.length === 0) {
        res.status(500).send("Not Found");
      } else {
        res.json(results);
      }
    }
  });
});

/* // 3. Add Product to Cart

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
			`Available from $${desiredPlant.StartPrice}`;
		// Set plant image
		plantItem.querySelector("img").src = desiredPlant.ImageURL;
		plantItem.querySelector("img").alt = `${desiredPlant.PlantName} plant`;
	} else {
		console.log(`Plant with PlantId ${plantId} not found.`);
	}
	
	const size = req.params['size'];
	let query2 = 'select plantname, plantsize, price from plant, plantsize where plantsize.plantid=plant.plantid AND plant.plantid=' + plantId + ' AND plantsize="small"';
	db.query2(query2, function (error, results, fields) {
		if (error) {
			res.status(500).send('Internal Error');
		} else {
			res.json(results);
			res.send("Was Added to the Cart");
			app.use(session({
				genid: function (req) {
				console.log(uuid.v4());
				},
				secret: 'keyboard cat',
				saveUninitialized: false,
				resave: true,
				cookie: { secure: true }
			}));
		}
	});

	app.get('/cart/items', function(req, res) {
		if (error) {
			app.use(session({
				genid: function (req) {
				const sessionID = uuid.v4();
				console.log(sessionID);
				},
				secret: 'keyboard cat',
				saveUninitialized: false,
				resave: true,
				cookie: { secure: true }
			}));
			app.use(session({
				genid: function (req) {
				const cartItemID = uuid.v4();
				console.log(sessionID);
				},
				secret: 'keyboard cat',
				saveUninitialized: false,
				resave: true,
				cookie: { secure: true }
			}));
			let query3 = 'insert into cartitems (cartItemID, plantID, PlantSizeID, sessionID) values ' +  ;
			db.query3(error, results, fields) {
				res.send("Was Added To The Cart")
			}
		}
	// if cart is empty
		// generate a session ID
			/*app.use(session({
				genid: function (req) {
				return genuuid()
				},
				secret: 'keyboard cat',
				resave: false,
				cookie: { secure: false }
			})) */

// else
// use previously generated session ID
// 'insert into table cartitems (cartitemid, sessionid,) */

// Get cart items
app.get("/cart/items", function (req, res) {
  let query = "select * from cartitem";
  db.query(query, function (error, results, fields) {
    if (error) {
      res.status(500).send("Internal Error");
    } else {
      if (results.length === 0) {
        res.status(500).send("Not Found");
        res.json(results);
      }
    }
  });
});

// Get cart items count
app.get("/cart/items/count", (req, res) => {
  db.query(
    'SELECT COUNT(*) as "count" FROM CartItem WHERE SessionID = ?',
    [req.sessionID],
    (error, results) => {
      if (error) {
        res.status(500).send("Internal Error");
      } else {
        res.json(results[0].count);
      }
    }
  );
});

// Remove item from cart
app.delete("/cart/items/:cartitemid", function (req, res) {
  const id = req.params["cartitemid"];
  let query = "delete from cartitem where cartitemid =" + cartitemid;
  db.query(query, function (error, results, fields) {
    if (error) {
      res.status(500).send("Internal Error");
    } else {
      if (results.length === 0) {
        res.status(500).send("Not Found");
        res.json(results);
        res.post("Item removed.");
      }
    }
  });
});
