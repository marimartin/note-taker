// DEPENDENCIES
var express = require("express");
const path = require("path");


// CREATING AN EXPRESS SERVER
var app = express();


// SET PORT
var PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML ROUTES

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API ROUTE
require("./routes/apiRoutes")(app);

// If no matching route is found
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// LISTENER
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
