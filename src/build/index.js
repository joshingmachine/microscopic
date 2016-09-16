// dependencies
var postcss = require("postcss");
var cssnext = require("postcss-cssnext");
var cssnano = require("cssnano");
var fs      = require("fs");
var path    = require("path");

var inputPath = path.join(__dirname, "../styles.css");
var outputPath = path.join(__dirname, "../../m.css");

// read css
var css = fs.readFileSync(inputPath, "utf8");

// process css
postcss([ cssnext, cssnano ])
    .process(css, { from: inputPath, to: outputPath })
    .then(function (result) {
        fs.writeFileSync(outputPath, result.css);
        if ( result.map ) fs.writeFileSync("app.css.map", result.map);
    })
    .catch(function(err) {
        console.log(err);
    });
