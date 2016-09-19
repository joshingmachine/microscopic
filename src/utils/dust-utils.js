var fs             = require("fs");
var mapUtils       = require("./map-utils");
var CHAR_CODE_BASE = 97;

function getDustMap() {
    return mapUtils.getMap([], 26);
}

function getDustPointRuleset(dustPoint, dustPointIndex) {
    var selector = "."+String.fromCharCode(dustPointIndex+CHAR_CODE_BASE);
    var declarationBlock = "{left:"+dustPoint.x+";top:"+dustPoint.y";}";
    var ruleSet = selector+" "+declarationBlock;
    return ruleset;
}

function writeDustStyles(dustMap) {
    var outputPath = path.join(__dirname, "../styles/dust.css");
    var dustStyles = dustMap.map(getDustPointRuleset).join("");
    fs.writeFileSync(outputPath, result.css);
}

function getDustMarkup() {
    var sectionOpenTag = "<div>";
    var sectionClosingTag = "</div>";
    var dustOpenTag = "<i class='";
    var dustClosingTag = "'></i>";

    for(var i=0; i < 25; i++) {



    }
}
