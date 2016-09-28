var mapUtils = require("./map-utils");
var minifyUtils = require("./minify-utils");
var faces = require("../constants/microbes/faces.js");

const CHAR_CODE_BASE = 97;
const ALPHABET = (function() {
    var alphabet = [];
    for(var i=0; i < 26; i++) {
        alphabet.push(String.fromCharCode(i+CHAR_CODE_BASE));
    }
    return alphabet;
})();


// function getMicrobe(type) {
//     if(type === "friend") {
//
//     } else {
//
//     }
// }
//
// function getMicrobes() {
//     '.mc_l[for="'+microbeId+'"]'
// }
//
// module.exports = {
//     getMicrobes: getMicrobes
// };
//
// function getMicrobeCheckboxMarkup(id) {
//     return '<input class="mc_c" type="checkbox" id="'+id+'"';
// }
//
// function getMicrobeLabelMarkup(microbePayload) {
//     return [
//         '<label class="mc_l" for="'+microbePayload.id+'">',
//         microbePayload.face,
//         getMicrobeDialogMarkup(microbePayload.dialog),
//         ''
//     ];
// }
//
// function getMicrobeMarkup(microbePayload) {
//     return `<input class="mc_c" type="checkbox" id="${microbePayload.id}">
//     <label class="mc_l" for="${microbePayload.id}">
//     <span class="mc_f">${microbePayload.face}</span>
//
//
//     `;
// }

function getMicrobeTemplate(id, face, dialogArray, groupClass) {
    return `<input class="mc_c ${groupClass}" type="checkbox" id="${id}">
            <label class="mc_l ${groupClass}" for="${id}">
                <span class="mc_f">${face}</span>
                <code class="mc_d">You made me red</code>
            </label>`;
}

function getMicrobeFace(groupClass) {
    if(groupClass === "friend") {
        return faces[0];
    } else {
        return faces[Math.floor(Math.random()*faces.length)];
    }
}

function getMicrobeGroup(groupClass, groupNum, startIndex=0) {
    var microbeGroup = [];

    for(var i=startIndex; i<groupNum+startIndex; i++) {
        var microbeId = ALPHABET[i];
        var microbeFace = getMicrobeFace(groupClass);
        var microbeDialog = [];
        var microbeTemplate = getMicrobeTemplate(microbeId, microbeFace, microbeDialog, groupClass);
        microbeGroup.push(microbeTemplate);
    }

    return microbeGroup;
}

function getDynamicMicrobeMarkup() {
    var dishOpen = ["<div class=\"dish-wrapper\"><div class=\"dish\">"];

    var friends = getMicrobeGroup("friend", 4, 0);
    var strangers = getMicrobeGroup("stranger", 12, 4);

    var dishClose = ["</div></div>"];

    var microbes = dishOpen.concat(friends, strangers, dishClose);

    var microbeString = [].concat.apply([], microbes).join("");
    var minifiedMicrobes = minifyUtils.getMinifiedMarkup(microbeString);
    return Promise.resolve(minifiedMicrobes);
}


function getPositionStyles() {
    var styleMarkups = [
        "<style>"
    ];

    var stylePositions = mapUtils.getMap([{ x: 0, y: 0}], 16, 14);

    stylePositions.forEach(function(stylePosition, stylePositionIndex) {
        var microbeId = ALPHABET[stylePositionIndex];
        var style = `[for="${microbeId}"] { left: ${stylePosition.x}%; top: ${stylePosition.y}%; }`;
        styleMarkups.push(style);
    });

    styleMarkups.push("</style>");

    var styleString = [].concat.apply([], styleMarkups).join("");
    var minifiedStyleString = minifyUtils.getMinifiedMarkup(styleString);
    return Promise.resolve(minifiedStyleString);
}






module.exports = {
    getPositionStyles: getPositionStyles,
    getDynamicMicrobeMarkup: getDynamicMicrobeMarkup
};
