// dependencies
const fs        = require("fs");
const path      = require("path");

// css dependencies
const postcss   = require("postcss");
const cssimport = require("postcss-import");
const cssnext   = require("postcss-cssnext");
const cssnano   = require("cssnano")({ autoprefixer: false });

function rebuildStylesheet() {
    console.log("Rebuilding stylesheet...");

    return new Promise(function(resolve, reject) {
        const inputPath = path.join(__dirname, "../styles/styles.css");
        const outputPath = path.join(__dirname, "../../bin/m.css");

        fs.readFile(inputPath, "utf8", function(err, css) {
            if(err) {
                return reject(err);
            } else {
                // process css
                postcss([ cssimport, cssnext, cssnano ])
                    .process(css, {
                        from: inputPath,
                        to: outputPath
                    })
                    .then(function (result) {
                        fs.writeFile(outputPath, result.css, "utf8", function(err) {
                            if(err) {
                                return reject(err);
                            } else {
                                console.log("Succesfully rebuilt stylesheet");
                                return resolve();
                            }
                        });
                    })
                    .catch(function(err) {
                        return reject(err);
                    });
            }
        });


    });

    // Promise.all([rebuildDustMarkup(), rebuildDustStyles()]).then(function() {
    //     console.log("Succesfully rebuilt dust");
    // }).catch(function(err) {
    //     console.error("Error rebuilding dust: ", err);
    // });
}


module.exports = rebuildStylesheet;
