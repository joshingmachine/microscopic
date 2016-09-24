const rebuildDustMarkup = require("./markup.js");
const rebuildDustStyles = require("./styles.js");

function rebuildDust() {
    console.log("Rebuilding dust...");

    return Promise.all([rebuildDustMarkup(), rebuildDustStyles()]).then(function() {
        console.log("Succesfully rebuilt dust");
    }).catch(function(err) {
        return err;
    });
}

module.exports = rebuildDust;
