
const CHAR_CODE_BASE = 97;
const ALPHABET = (function() {
    var alphabet = [];
    for(var i=0; i < 26; i++) {
        alphabet.push(String.fromCharCode(i+CHAR_CODE_BASE));
    }
    return alphabet;
})();


function getMicrobes() {
    '.mc_l[for="'+microbeId+'"]'
}

module.exports = {
    getMicrobes: getMicrobes
};
