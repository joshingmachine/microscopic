// dependencies
const fs        = require("fs");
const path      = require("path");

// css dependencies
const minifyUtils = require("../../utils/minify-utils.js");
const markupUtils = require("../../utils/markup-utils.js");

function bundleHeadMarkup() {
    return new Promise(function(resolve, reject) {
        console.log("Bundling head markup");
        markupUtils.getPartialMarkup("head")
        .then(minifyUtils.getMinifiedMarkup)
        .then(function(minifiedMarkup) {
            const binPath    = "/bin/views/head.html";
            const outputPath = path.join(__dirname, "../../../", binPath);

            fs.writeFile(outputPath, minifiedMarkup, "utf8", function(err) {
                if(err) {
                    return reject(err);
                } else {
                    console.log("Bundling head markup [SUCCESS]");
                    return resolve();
                }
            });
        });
    });
}

function bundleBodyMarkup() {
    return new Promise(function(resolve, reject) {
        console.log("Bundling body markup");

        // TODO: Add markupUtils.getPartialMarkup("microscope") below

        const markupBundlers = [
            // markupUtils.getPartialMarkup("dish"),
            // markupUtils.getPartialMarkup("microscope")
        ];

        Promise.all(markupBundlers)
            .then(function(markupPartials) {
                return markupPartials.join("");
            })
            .then(minifyUtils.getMinifiedMarkup)
            .then(function(minifiedMarkup) {
                const binPath    = "/bin/views/body.html";
                const outputPath = path.join(__dirname, "../../../", binPath);

                fs.writeFile(outputPath, minifiedMarkup, "utf8", function(err) {
                    if(err) {
                        return reject(err);
                    } else {
                        console.log("Bundling body markup [SUCCESS]");
                        return resolve();
                    }
                });
            });
    });
}


function bundleMarkup() {
    console.log("\t\tBundling generated markup files...");

    const markupBundlers = [
        bundleHeadMarkup(),
        bundleBodyMarkup()
    ];

    return Promise.all(markupBundlers).then(function() {
        console.log("Bundling markup files [SUCCESS]");
        return;
    }).catch(function(err) {
        throw err;
    });
}


module.exports = bundleMarkup;
