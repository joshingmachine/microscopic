// dependencies
const fs        = require("fs");
const path      = require("path");

// css dependencies
const postcss   = require("postcss");
const cssimport = require("postcss-import");
const cssnext   = require("postcss-cssnext");
const cssnano   = require("cssnano")({ autoprefixer: false });

function bundleStylesheets() {
    console.log("\t\tBundling generated stylesheets...");

    return new Promise(function(resolve, reject) {
        const inputPath = path.join(__dirname, "../../styles/styles.css");
        const binPath = "/bin/styles/m.css";
        const outputPath = path.join(__dirname, "../../../", binPath);

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
                                console.log("\t\tBundling stylesheets [SUCCESS]");
                                console.log("\t\tStylesheets bundled to", binPath);
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
}


module.exports = bundleStylesheets;
