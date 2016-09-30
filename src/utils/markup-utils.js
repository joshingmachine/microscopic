var fs           = require("fs");
var path         = require("path");
var dustUtils    = require("./dust-utils");
var microbeUtils = require("./microbe-utils");

function getPartialMarkup(partialName) {
    return new Promise(function(resolve, reject) {
        const inputPath = path.join(__dirname, "../views/partials/"+partialName+".html");

        fs.readFile(inputPath, "utf8", function(err, partialMarkup) {
            if(err) {
                return reject(err);
            } else {
                return resolve(partialMarkup);
            }
        });
    });
}

function getStaticMarkup(partialName) {
    return new Promise(function(resolve, reject) {
        const inputPath = path.join(__dirname, "../../bin/views/"+partialName+".html");

        fs.readFile(inputPath, "utf8", function(err, partialMarkup) {
            if(err) {
                return reject(err);
            } else {
                return resolve(partialMarkup);
            }
        });
    });
}

function getDynamicDustMarkup() {
    const dustMarkups = [
        dustUtils.getRandomDustMarkup(),
        dustUtils.getRandomDustMarkup()
    ];

    return Promise.all(dustMarkups);
}

function getMarkup() {
    const markupPromises = [ getStaticMarkup("head"),
                             microbeUtils.getPositionStyles(),
                             Promise.resolve("<body>"),
                             getDynamicDustMarkup(),
                             microbeUtils.getDynamicMicrobeMarkup(),
                             Promise.resolve("</body>")];

    return Promise.all(markupPromises).then(function(markupSections) {
        return [].concat.apply([], markupSections).join("");
    })
}

module.exports = {
    getMarkup: getMarkup,
    getPartialMarkup: getPartialMarkup
};
