// Dependencies
var express = require("express");
const path = require("path");

// Creating an express server
var app = express();

// Set port
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// app.get("/", function (req, res) {
//     res.send("Welcome to the Note Taker App");
// });

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// If no matching route is found default to home
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/home.html"));
});

// Listener
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
