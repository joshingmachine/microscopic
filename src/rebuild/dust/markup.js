// dependencies
const fs          = require("fs");
const path        = require("path");
const minifyUtils = require("../../utils/minify-utils");

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
function getDustPointMarkup(dustPointClass) {
    return "<i class='"+dustPointClass+"'></i>";
}

function getDustPointClasses() {
    const dustPointClasses = [];

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
    const dustPointClasses = getDustPointClasses();
    const dustPointMarkup = dustPointClasses.map(getDustPointMarkup).join("");
    return "<div>"+dustPointMarkup+"</div>";
}

function getDustLayerMarkup(numOfDustSections) {
    let layerMarkup = "<div class='dust-layer'>";

    for(let i=0; i < numOfDustSections; i++) {
        let dustSectionMarkup = getDustSectionMarkup();
        layerMarkup += dustSectionMarkup;
    }

    return layerMarkup+"</div>";
}

function writeDustMarkup(dustLayerMarkup, i) {
    const outputPath = path.join(__dirname, "../../views/dust/dust-"+i+".html");

    return new Promise(function(resolve, reject) {
        fs.writeFile(outputPath, dustLayerMarkup, "utf8", function(err) {
            if(err) {
                return reject(err);
            } else {
                return resolve();
            }
        });
    })
}

function getDustFileWrites(numOfDustFiles) {
    const dustFileWrites = [];

    for(let i=0; i < numOfDustFiles; i++) {
        let dustLayerMarkup = getDustLayerMarkup(25);
        dustLayerMarkup = minifyUtils.getMinifiedMarkup(dustLayerMarkup);
        dustFileWrites.push(writeDustMarkup(dustLayerMarkup, i));
    }

    return dustFileWrites;
}

function rebuildDustMarkup() {
    return Promise.all(getDustFileWrites(100));
}

module.exports = rebuildDustMarkup;
