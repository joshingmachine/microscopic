// depdendencies
const buildStylesheets = require("./stylesheets/build.js");
const buildMarkup      = require("./markup/build.js");

console.log("Starting build...");

// build the files concurrently
const buildFiles = [
    buildStylesheets(),
    buildMarkup()
];

Promise.all(buildFiles).then(function() {
    console.log("Finished build [COMPLETE]");
}).catch(function(error) {
    console.error("Error during build:", error);
});
