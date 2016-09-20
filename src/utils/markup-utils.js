var fs        = require("fs");
var path      = require("path");
var dustUtils = require("./dust-utils");

function getPartialMarkup(partialName) {
    var inputPath = path.join(__dirname, "../views/partials/"+partialName+".html");
    var partialMarkup = fs.readFileSync(inputPath, "utf8");
    return partialMarkup;
}

function getStyleMarkup() {
    var inputPath = path.join(__dirname, "../styles/dust.css");
    var styleMarkup = fs.readFileSync(inputPath, "utf8");
    return "<style>"+styleMarkup+"</style>";
}

function getMarkup() {
    var headMarkup = getPartialMarkup("head");
    var styleMarkup = getStyleMarkup();
    var dustMarkup = dustUtils.getRandomDustMarkup();
    var dishMarkup = getPartialMarkup("dish");
    var microscopeMarkup = getPartialMarkup("microscope");
    var markup = headMarkup+styleMarkup+"<body>"+dustMarkup+dishMarkup+microscopeMarkup+"</body>";

    return markup;
}

module.exports = {
    getMarkup: getMarkup
};
