var fs        = require("fs");
var path      = require("path");
var dustUtils = require("./dust-utils");

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

// function getStyleMarkup() {
//     return new Promise(function(resolve, reject) {
//         const inputPath = path.join(__dirname, "../styles/dust.css");
//
//         fs.readFile(inputPath, "utf8", function(err, styleMarkup) {
//             if(err) {
//                 return reject(err);
//             } else {
//                 return resolve(styleMarkup);
//             }
//         })
//     });
//
//     return "<style>"+styleMarkup+"</style>";
// }





function getStaticHeadMarkup() {
    return getPartialMarkup("head");
}

function getDynamicHeadMarkup() {
    return getBacteriaPositionStyleMarkup();
}

function getDustMarkup() {
    const dustMarkupPromises = [
        dustUtils.getRandomDustMarkup(),
        dustUtils.getRandomDustMarkup()
    ];

    return Promise.all(dustMarkupPromises);
}

function getDynamicBodyMarkup() {
    const dynamicBodyMarkupPromises = [
        getDustMarkup(),

    ];

    return Promise.all()
}

function getStaticBodyMarkup() {
    return Promise.resolve();
}

function getMarkup() {
    const markupPromises = [ getStaticHeadMarkup(),
                             getDynamicHeadMarkup(),
                             getDynamicBodyMarkup(),
                             getStaticBodyMarkup() ];

    return Promise.all(markupPromises).then(function(markupSections) {
        return markupSections.join("");
    })
}

module.exports = {
    getMarkup: getMarkup
};
