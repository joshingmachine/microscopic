var fs             = require("fs");
var path           = require("path");
var mapUtils       = require("./map-utils");
var CHAR_CODE_BASE = 97;
var ALPHABET = (function() {
    var alphabet = [];
    for(var i=0; i < 26; i++) {
        alphabet.push(String.fromCharCode(i+CHAR_CODE_BASE));
    }
    return alphabet;
})();

function getDustMap() {
    return mapUtils.getMap([], 26);
}

function getDustPointRuleset(dustPoint, dustPointIndex) {
    var selector = "."+ALPHABET[dustPointIndex];
    var declarationBlock = "{left:"+dustPoint.x+"%;top:"+dustPoint.y+"%;}\n";
    var ruleSet = selector+" "+declarationBlock;
    return ruleSet;
}

function writeDustStyles(dustMap) {
    var outputPath = path.join(__dirname, "../styles/dust.css");
    var dustStyles = dustMap.map(getDustPointRuleset).join("");
    fs.writeFileSync(outputPath, dustStyles);
}

function getDustLayerMarkup() {
    var layerMarkup = "<div class='dust-layer'>\n";

    for(var i=0; i < 25; i++) {
        var dustSectionMarkup = getDustSectionMarkup();
        layerMarkup += dustSectionMarkup;
    }

    return layerMarkup+"</div>";
}

function getDustPointClasses() {
    var dustPointClasses = [];

    do {
        var candidate = ALPHABET[Math.floor(Math.random()*ALPHABET.length)];
        var candidateAbsent = dustPointClasses.every(dustPointClass => (dustPointClass !== candidate));
        if(candidateAbsent) {
            dustPointClasses.push(candidate);
        }
    } while (dustPointClasses.length < 6);

    return dustPointClasses;
}

function getDustSectionMarkup() {
    var dustPointClasses = getDustPointClasses();
    var dustPointMarkup = dustPointClasses.map(getDustPointMarkup).join("");

    return "    <div>\n"+dustPointMarkup+"    </div>\n";
}

function getDustPointMarkup(dustPointClass) {
    return "        <i class='"+dustPointClass+"'></i>\n";
}

function writeDustMarkup(dustLayerMarkup, i) {
    var outputPath = path.join(__dirname, "../views/dust/dust-"+i+".html");
    fs.writeFileSync(outputPath, dustLayerMarkup);
}

function getRandomDustMarkup() {
    var inputPath = path.join(__dirname, "../views/dust");
    var dustFiles = fs.readdirSync(inputPath);
    var dustFileName = dustFiles[Math.floor(Math.random()*dustFiles.length)];
    var dustPath = inputPath+"/"+dustFileName;
    var dustMarkup = fs.readFileSync(dustPath, "utf8");
    return dustMarkup;
}

module.exports = {
    getDustMap: getDustMap,
    writeDustStyles: writeDustStyles,
    getDustLayerMarkup: getDustLayerMarkup,
    writeDustMarkup: writeDustMarkup,
    getRandomDustMarkup: getRandomDustMarkup
};
