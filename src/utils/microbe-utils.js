var mapUtils = require("./map-utils");
var minifyUtils = require("./minify-utils");
var faces = require("../constants/microbes/faces.js");
var friendDialog = require("../constants/microbes/dialog/friends.js");
var strangerDialog = require("../constants/microbes/dialog/friends.js");

const CHAR_CODE_BASE = 97;
const ALPHABET = (function() {
    var alphabet = [];
    for(var i=0; i < 26; i++) {
        alphabet.push(String.fromCharCode(i+CHAR_CODE_BASE));
    }
    return alphabet;
})();

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}


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

function getDialogMarkup(dialogArray) {
    console.log("gDM", dialogArray);
    return dialogArray.map(function(dialogQuote) {
        return `<code class="mc_d">${dialogQuote}</code>`
    }).join("");
}

function getMicrobeTemplate(id, face, dialogArray, groupClass) {
    console.log("gMT", dialogArray);
    var dialogMarkup = getDialogMarkup(dialogArray);

    return `<input class="mc_c ${groupClass}" type="checkbox" id="${id}">
            <label class="mc_l ${groupClass}" for="${id}">
                <span class="mc_f">${face}</span>
                ${dialogMarkup}
            </label>`;
}

function getMicrobeFace(groupClass) {
    if(groupClass === "friend") {
        return faces[0];
    } else {
        return faces[Math.floor(Math.random()*faces.length)];
    }
}

function getDialogSource(groupClass) {
    if(groupClass === "friend") {
        return friendDialog;
    } else {
        return strangerDialog;
    }
}

function getMicrobeGroup(groupClass, groupNum, startIndex=0) {
    var microbeGroup = [];
    var dialogSource = shuffle(getDialogSource(groupClass));
    console.log("gMG DS", dialogSource);

    for(var i=startIndex; i<(groupNum+startIndex); i++) {
        var microbeId = ALPHABET[i];
        var microbeFace = getMicrobeFace(groupClass);
        var microbeDialog = dialogSource[i];
        console.log("microbeDialog", microbeDialog);
        var microbeTemplate = getMicrobeTemplate(microbeId, microbeFace, microbeDialog, groupClass);
        microbeGroup.push(microbeTemplate);
    }

    return microbeGroup;
}

function getDynamicMicrobeMarkup() {
    var dishOpen = ["<div class=\"dish-wrapper\"><div class=\"dish\">"];

    var friends = getMicrobeGroup("friend", 4, 0);
    var strangers = getMicrobeGroup("stranger", 4, 4);

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
