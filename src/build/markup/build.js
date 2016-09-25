// dependencies
const generateDustMarkup = require("./generators/dust.js");
const bundleMarkup       = require("./bundle.js");

function buildMarkup() {
    console.log("\tBuilding markup...")

    // generate the individual markup files concurrently
    console.log("\t\tGenerating markup files...");
    const markupGenerators = [
        generateDustMarkup()
    ];

    return Promise.all(markupGenerators)
    .then(function() {
        console.log("\t\tGenerating markup files [SUCCESS]");
        return bundleMarkup();
    })
    .catch(function(error) {
        throw error;
    });
}

module.exports = buildMarkup;
