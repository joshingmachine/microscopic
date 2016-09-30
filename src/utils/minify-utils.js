// dependencies
var fs       = require("fs");
var path     = require("path");

// html dependencies
var minify   = require("html-minifier").minify;

// css dependencies
var postcss  = require("postcss");
var atImport = require("postcss-import")
var cssnext  = require("postcss-cssnext");
var cssnano  = require("cssnano")({ autoprefixer: false });

function minifyCSS() {
    var inputPath = path.join(__dirname, "../styles/styles.css");
    var outputPath = path.join(__dirname, "../../bin/m.css");

    return new Promise(function(resolve, reject) {
        // read css
        var css = fs.readFileSync(inputPath, "utf8");

        fs.readFile(inputPath, "utf8", function(err, css) {
            if(err) {
                return reject(err);
            } else {
                // process css
                postcss([ cssnext, cssnano ])
                    .process(css, { from: inputPath, to: outputPath })
                    .then(function (result) {
                        fs.writeFile(outputPath, result.css, "utf8", function(err) {
                            if(err) {
                                return reject(err);
                            } else {
                                return resolve();
                            }
                        });
                        fs.writeFileSync(outputPath, result.css);
                        return resolve();
                    })
                    .catch(function(err) {
                        return reject(err);
                    });
            }
        })
    });
}

// function minifyHTML(markup) {
//     const inputPath = path.join(__dirname, "../views/index.html");
//     const outputPath = path.join(__dirname, "../../bin/index.html");
//
//     return new Promise(function(resolve, reject) {
//         var html = markup || fs.readFileSync(inputPath, "utf8");
//
//         var minifiedHTML = minify(html, {
//             collapseBooleanAttributes: true,
//             collapseInlineTagWhitespace: true,
//             collapseWhitespace: true,
//             minifyCSS: true,
//             removeAttributeQuotes: true,
//             removeComments: true,
//             removeRedundantAttributes: true,
//             removeScriptTypeAttributes: true
//         });
//
//         //fs.writeFileSync(outputPath, result);
//         return resolve(minifiedHTML);
//     });
// }





function getMinifiedMarkup(markup) {
    return minify(markup, {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true
    });
}

module.exports = {
    getMinifiedMarkup: getMinifiedMarkup
};
