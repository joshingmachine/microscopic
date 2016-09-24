// Dynamic things per each refresh of the game:
//    The bateria dialog
//    The position of bacteria
//    The position of dust

const rebuildDust       = require("./dust/index.js");
const rebuildStylesheet = require("./styles.js");

rebuildDust()
    .then(rebuildStylesheet)
    .then(function() {
        console.log("Rebuild was sucessful");
    })
    .catch(function(err) {
        console.error("Error in rebuilding process: ", err);
    });
