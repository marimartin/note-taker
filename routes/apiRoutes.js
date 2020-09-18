var fs = require("fs");
const path = require("path");



// ROUTING
module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        console.log("here");

        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }

        });




