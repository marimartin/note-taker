// DEPENDENCIES
var fs = require("fs");
const path = require("path");

// UUID for adding ID to each note
const { v4: uuidv4 } = require('uuid');



// ROUTING
module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            const parsedData = JSON.parse(data);

            res.json(parsedData);
        });

    });



    // API POST Requests - adds notes to db.json
    app.post("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            const parsedData = JSON.parse(data);

            // adds unique id to each note
            req.body.id = uuidv4();

            parsedData.push(req.body);

            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(parsedData), function (err) {
                if (err) {
                    return console.log(err);
                }

                res.sendFile(path.join(__dirname, "../public/notes.html"));
            });
        });
    });

    // API DELETE Requests - deletes notes from db.json
    app.delete("/api/notes/:id", function (req, res) {
        console.log(req.params.id);
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            const parsedData = JSON.parse(data);

            // compares selected note id to ids in db.json
            const filteredNotes = parsedData.filter(function (item) {
                return item.id !== req.params.id;
            })

            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filteredNotes), function (err) {
                if (err) {
                    return console.log(err);
                }

                res.sendFile(path.join(__dirname, "../public/notes.html"));
            });
        })
    });
};
