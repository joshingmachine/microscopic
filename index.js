"use strict";

var compression = require("compression");
var express     = require("express");
var app         = express();
var minifyHTML  = require("./src/utils/minify-utils").minifyHTML;
var markupUtils = require("./src/utils/markup-utils");

app.use(compression({level:9}));
app.use(express.static("bin"));

app.get("/", function (req, res) {
    // var markup = markupUtils.getMarkup();

    markupUtils.getMarkup().then(function(markup) {
        res.send(markup);
    });
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
