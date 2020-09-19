var fs = require("fs");
const path = require("path");

const { v4: uuidv4 } = require('uuid');



// ROUTING
module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        console.log("here");

        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }

            const parsedData = JSON.parse(data);

            res.json(parsedData);
        });

    });



    // API POST Requests

    app.post("/api/notes", function (req, res) {
        // 
        // console.log(req.body);


        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }


            const parsedData = JSON.parse(data);

            req.body.id = uuidv4();

            parsedData.push(req.body);


            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(parsedData), function (err) {

                if (err) {
                    return console.log(err);
                }

                // console.log("Success!");

                // res.json(parsedData);

                // console.log(__dirname);
                res.sendFile(path.join(__dirname, "../public/notes.html"));
            });

        });



    });

    app.delete("/api/notes/:id", function (req, res) {
        console.log(req.params.id);
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            const parsedData = JSON.parse(data);
            const filteredNotes = parsedData.filter(function (item) {
                // if (item.id === req.params.id) {
                //     return false;
                // }
                // return true;
                return item.id !== req.params.id;
            })
            console.log(filteredNotes);

            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filteredNotes), function (err) {

                if (err) {
                    return console.log(err);
                }

                // console.log("Success!");

                // res.json(parsedData);

                // console.log(__dirname);
                res.sendFile(path.join(__dirname, "../public/notes.html"));
            });
        })
    });
};
