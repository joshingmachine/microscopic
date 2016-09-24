// dependencies
const fs          = require("fs");
const path        = require("path");
const mapUtils    = require("../../utils/map-utils.js");
const minifyUtils = require("../../utils/minify-utils.js");

// constants
const CHAR_CODE_BASE = 97;
const ALPHABET       = (function() {
    var alphabet = [];
    for(var i=0; i < 26; i++) {
        alphabet.push(String.fromCharCode(i+CHAR_CODE_BASE));
    }
    return alphabet;
})();

// functions
function getDustMap() {
    return mapUtils.getMap([], ALPHABET.length);
}

function getDustPointRuleset(dustPoint, dustPointIndex) {
    const selector = "."+ALPHABET[dustPointIndex];
    const declarationBlock = "{left:"+dustPoint.x+"%;top:"+dustPoint.y+"%;}\n";
    const ruleSet = selector+" "+declarationBlock;
    return ruleSet;
}

function rebuildDustStyles() {
    return new Promise(function(resolve, reject) {
        const dustMap = getDustMap();
        const dustStyles = dustMap.map(getDustPointRuleset).join("");
        const outputPath = path.join(__dirname, "../../styles/dust.css");

        fs.writeFile(outputPath, dustStyles, "utf8", function(err) {
            if(err) {
                return reject(err);
            } else {
                return resolve()
            }
        });
    });
}

module.exports = rebuildDustStyles;
