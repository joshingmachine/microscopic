"use strict";

var compression            = require("compression");
var express                = require("express");
var app                    = express();
var path                   = require("path");
var getBacteriaCoordinates = require("./utils").getBacteriaCoordinates;

app.use(compression({level:9}));
app.use(express.static("./"));

app.get("/", function (req, res) {
    var bacteriaCoordinates = getBacteriaCoordinates();



    res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
