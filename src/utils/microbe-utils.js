
const CHAR_CODE_BASE = 97;
const ALPHABET = (function() {
    var alphabet = [];
    for(var i=0; i < 26; i++) {
        alphabet.push(String.fromCharCode(i+CHAR_CODE_BASE));
    }
    return alphabet;
})();


function getMicrobe(type) {
    if(type === "friend") {

    } else {

    }
}

function getMicrobes() {
    '.mc_l[for="'+microbeId+'"]'
}

module.exports = {
    getMicrobes: getMicrobes
};

function getMicrobeCheckboxMarkup(id) {
    return '<input class="mc_c" type="checkbox" id="'+id+'"';
}

function getMicrobeLabelMarkup(microbePayload) {
    return [
        '<label class="mc_l" for="'+microbePayload.id+'">',
        microbePayload.face,
        getMicrobeDialogMarkup(microbePayload.dialog),
        ''
    ];
}

function getMicrobeMarkup(microbePayload) {
    return `<input class="mc_c" type="checkbox" id="${microbePayload.id}">
    <label class="mc_l" for="${microbePayload.id}">
    <span class="mc_f">${microbePayload.face}</span>
        

    `;
}




<input class="mc_c" type="checkbox" id="a">
<label class="mc_l" for="a">
    <span class="mc_f">◕_◕</span>
    <code class="mc_d">You made me red</code>
</label>
