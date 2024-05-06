// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const db = require("./database");

// Setup express app
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.listen(3000, () => console.log("Website URL: http://localhost:3000"));

// Setup express session
app.use(
  session({
    name: "SessionID",
    secret: process.env.SESSION_SECRET || "HAW9b7PAtB",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 2.592e9 }, // 30 days
  })
);

// Get all plants
app.get("/plants", (_, res) => {
  db.query(
    'SELECT Plant.PlantID, PlantName, ImageURL, Price as "StartPrice" FROM Plant, PlantSize WHERE Plant.PlantID = PlantSize.PlantID AND PlantSize = "small"',
    (error, results) => {
      if (error) {
        res.status(500).send("Internal Error");
      } else {
        res.json(results);
      }
    }
  );
});

// Get details of plant
app.get("/plants/:PlantID", (req, res) => {
  db.query(
    "SELECT PlantID, PlantName, ImageURL FROM Plant WHERE PlantID = ?",
    [req.params["PlantID"]],
    (error, results) => {
      if (error) {
        res.status(500).send("Internal Error");
      } else {
        if (results.length === 0) {
          res.status(404).send("Not Found");
        } else {
          const plant = results[0];
          db.query(
            "SELECT PlantSizeID, PlantSize, Price FROM PlantSize WHERE PlantID = ?",
            [req.params["PlantID"]],
            (error, results) => {
              if (error) {
                res.status(500).send("Internal Error");
              } else {
                if (results.length === 0) {
                  res.status(404).send("Not Found");
                } else {
                  plant.Sizes = results;
                  res.json(plant);
                }
              }
            }
          );
        }
      }
    }
  );
});

// Add plant to cart of session
app.post("/cart/items", (req, res) => {
  db.query(
    "INSERT INTO CartItem(PlantID, PlantSizeID, SessionID) VALUES(?, ?, ?)",
    [req.body.PlantID, req.body.PlantSizeID, req.sessionID],
    (error) => {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Error");
      } else {
        res.send("Success");
      }
    }
  );
});

// Get cart items of session
app.get("/cart/items", (req, res) => {
  db.query(
    "SELECT CartItemID, Plant.PlantID, PlantName, ImageURL, PlantSize, Price FROM CartItem JOIN Plant ON CartItem.PlantID = Plant.PlantID JOIN PlantSize ON CartItem.PlantSizeID = PlantSize.PlantSizeID WHERE SessionID = ?",
    [req.sessionID],
    (error, results) => {
      if (error) {
        res.status(500).send("Internal Error");
      } else {
        res.json(results);
      }
    }
  );
});

// Get cart items count of session
app.get("/cart/items/count", (req, res) => {
  db.query(
    'SELECT COUNT(*) AS "count" FROM CartItem WHERE SessionID = ?',
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

// Remove item from cart of session
app.delete("/cart/items/:CartItemID", (req, res) => {
  db.query(
    "DELETE FROM CartItem WHERE CartItemID = ? AND SessionID = ?",
    [req.params["CartItemID"], req.sessionID],
    (error) => {
      if (error) {
        res.status(500).send("Internal Error");
      } else {
        res.send("Success");
      }
    }
  );
});

// Error page
app.get("/error", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.status(400).send('Error, Bad Request!');
});
