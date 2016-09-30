var mapUtils = require("./map-utils");
var minifyUtils = require("./minify-utils");
var faces = require("../constants/microbes/faces.js");
var tutorDialog = require("../constants/microbes/dialog/tutor.js");
var friendDialog = require("../constants/microbes/dialog/friends.js");
var strangerDialog = require("../constants/microbes/dialog/strangers.js");

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

function getLabelMarkup(id, face, groupClass) {
    return `<label class="microbe__label" for="${id}">
                <svg class="${groupClass}" style="height: 100%; width: 100%;" class="tutor" viewBox="0 0 250 150" preserveAspectRatio="xMidYMid meet">
                    <circle cx="75" cy="75" r="75"/>
                    <circle cx="175" cy="75" r="75"/>
                    <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill="black" font-size="30px">${face}</text>
                </svg>
            </label>`;
}

function getDialogMarkup(id, num, dialogArray) {
    if(num >= dialogArray.length) {
        return "";
    }

    var dialogId = `${id}-d${num}`;
    var dialogText = dialogArray[num];
    var dialogContinue =  (num < dialogArray.length-1) ? ">>>" : "X";

    return `<div class="dialog-expansion">
                <input type="checkbox" id="${dialogId}">
                <div class="dialog-content">
                    <span class="dialog-text">${dialogText}</span>
                    <label class="dialog-continue" for="${dialogId}">${dialogContinue}</label>
                </div>
                ${getDialogMarkup(id, num+1, dialogArray)}
            </div>`
}

function getMicrobeTemplate(id, face, dialogArray, groupClass) {
    var labelMarkup = getLabelMarkup(id, face, groupClass);
    var dialogMarkup = getDialogMarkup(id, 0, dialogArray);

    return `<input class="microbe__checkbox ${groupClass}" type="checkbox" id="${id}">
            <div class="microbe__content" id="microbe--${id}">
                ${labelMarkup}
                ${dialogMarkup}
            </div>`;
}

// <input type="checkbox" id="a">
// <label class="mc_l" for="a">:)</label>
// <div class="dialog-expansion">
//   <input type="checkbox" id="d1">
//   <div class="dialog-content">
//     <span class="dialog-text">Hello, it's me</span>
//     <label class="dialog-continue" for="d1">>>></label>
//   </div>
//   <div class="dialog-expansion">
//     <input type="checkbox" id="d2">
//     <div class="dialog-content">
//       <span>Can you hear me?</span>
//       <label for="d2">>>></label>
//     </div>
//     <div class="dialog-expansion">
//       <input type="checkbox" id="d3">
//       <div class="dialog-content">
//         <span>HELLO FROM THE OTHER SIDE</span>
//         <label for="d3">X</label>
//       </div>
//     </div>
//   </div>
// </div>

function getMicrobeFace(groupClass) {
    if(groupClass === "stranger") {
        return faces[Math.floor(Math.random()*faces.length)];
    } else {
        return faces[0];
    }
}

function getDialogSource(groupClass) {
    switch(groupClass) {
        case "tutor":
            return tutorDialog;
        case "friend":
            return friendDialog;
        default:
            return strangerDialog;
    }
}

function getMicrobeGroup(groupClass, groupNum, startIndex=0) {
    var microbeGroup = [];
    var dialogSource = shuffle(getDialogSource(groupClass));

    for(var i=startIndex; i<(groupNum+startIndex); i++) {
        var microbeId = ALPHABET[i];
        var microbeFace = getMicrobeFace(groupClass);
        var microbeDialog = dialogSource[i];
        var microbeTemplate = getMicrobeTemplate(microbeId, microbeFace, microbeDialog, groupClass);
        microbeGroup.push(microbeTemplate);
    }

    return microbeGroup;
}

function getDynamicMicrobeMarkup() {
    var dishOpen = ["<div class=\"dish-wrapper\"><div class=\"dish\">"];

    var tutor = getMicrobeGroup("tutor", 1, 0)
    var friends = getMicrobeGroup("friend", 3, 1);
    var strangers = getMicrobeGroup("stranger", 12, 4);
    var endgame = `<div class="microscope-wrapper"><div class="microscope"><div class="lens"></div></div></div><div class="endgame"><p>Congrats! You found them all!</p><p>Play Again?</p><div class="endgame-options"><a href="/">Yes</a><a href="https://www.buzzfeed.com/kellyoakes/what-type-of-bacteria-are-you?utm_term=.yoYxx9waA7#.vierrDjqmE">No, this was boring, I'd rather take some silly BuzzFeed quiz</a></div></div>`;
    var dishClose = ["</div></div>"];

    var microbes = dishOpen.concat(tutor, friends, strangers, endgame, dishClose);

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
        var style = `#microbe--${microbeId} { left: ${stylePosition.x}%; top: ${stylePosition.y}%; }`;
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
