// dependencies
var postcss = require("postcss");
var cssnext = require("postcss-cssnext");
var cssnano = require("cssnano")({ autoprefixer: false });
var minify  = require("html-minifier").minify;
var fs      = require("fs");
var path    = require("path");

function minifyCSS() {
    var inputPath = path.join(__dirname, "../styles/styles.css");
    var outputPath = path.join(__dirname, "../../bin/m.css");

    return new Promise(function(resolve, reject) {
        // read css
        var css = fs.readFileSync(inputPath, "utf8");

        // process css
        postcss([ cssnext, cssnano ])
            .process(css, { from: inputPath, to: outputPath })
            .then(function (result) {
                fs.writeFileSync(outputPath, result.css);
                console.log("CSS minified!");
                return resolve();
            })
            .catch(function(err) {
                return reject(err);
            });
    });
}

function minifyHTML(markup) {
    var inputPath = path.join(__dirname, "../views/index.html");
    var outputPath = path.join(__dirname, "../../bin/index.html");

    return new Promise(function(resolve, reject) {
        var html = markup || fs.readFileSync(inputPath, "utf8");

        var minifiedHTML = minify(html, {
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            minifyCSS: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true
        });

        //fs.writeFileSync(outputPath, result);
        console.log("HTML minified!");
        return resolve(minifiedHTML);
    });
}

module.exports = {
    minifyCSS: minifyCSS,
    minifyHTML: minifyHTML
};
