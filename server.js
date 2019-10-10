// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var reservations = [
  {
    customerName: "Mirko's Family",
    phoneNumber: "7048024004",
    customerEmail: "random@gmail.com",
    customerID: "#69696969696"
  }
];

var waitlist = [
  {
    customerName: "Jake Fenwick",
    phoneNumber: "5672830074",
    customerEmail: "jakefen@gmail.com",
    customerID: "#12341234123"
  }
]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
  });

// Displays all characters
app.get("/api/tables", function(req, res) {

  return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Displays a single character, or returns false
app.get("/api/reservations/:pickles", function(req, res) {
  var chosen = req.params.pickles;

  console.log(chosen);

  for (var i = 0; i < pickles.length; i++) {
    if (chosen === pickles[i].customerName) {
      return res.json(pickles[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCustomer = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newCustomer.customerName = newCustomer.customerName.replace(/\s+/g, "").toLowerCase();

  console.log(newCustomer);

  reservations.push(newCustomer);

  res.json(newCustomer);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});