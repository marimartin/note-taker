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

            const parsedData = JSON.parse(data);

            res.json(parsedData);
        });

    });



    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/notes", function (req, res) {
        // 
        console.log(req.body);


        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }

            const parsedData = JSON.parse(data);
            // 
            parsedData.push(req.body);

            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(parsedData), function (err) {

                if (err) {
                    return console.log(err);
                }

                console.log("Success!");

                // res.json(parsedData);

                console.log(__dirname);
                res.sendFile(path.join(__dirname, "../public/notes.html"));
            });

        });



    });



    // app.post("/api/clear", function (req, res) {
    //     // Empty out the arrays of data
    //     tableData.length = 0;
    //     waitListData.length = 0;

    //     res.json({ ok: true });
    // });
};
