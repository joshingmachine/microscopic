// dependencies
const generateDustStylesheet = require("./generators/dust.js");
const bundleStylesheets      = require("./bundle.js");

function buildStylesheets() {
    console.log("\tBuilding stylesheets...")
    console.log("\t\tGenerating stylesheets...");

    // generate the individual stylesheets concurrently
    const stylesheetGenerators = [
        generateDustStylesheet()
    ];

    return Promise.all(stylesheetGenerators)
        .then(function() {
            console.log("\t\tGenerating stylesheets [SUCCESS]");
            return bundleStylesheets();
        }).then(function() {
            console.log("\tBuilding stylesheets [SUCCESS]")
        })
        .catch(function(error) {
            throw error;
        });
}

module.exports = buildStylesheets;
