const fs   = require("fs");
const path = require("path");

function getRandomDustMarkup() {
    return new Promise(function(resolve, reject) {
        const inputPath = path.join(__dirname, "../views/dust");
        fs.readdir(inputPath, "utf8", function(err, files) {
            if(err) {
                return reject(err);
            } else {
                const fileName = files[Math.floor(Math.random()*files.length)];
                const filePath = inputPath+"/"+fileName;
                fs.readFile(filePath, "utf8", function(err, markup) {
                    if(err) {
                        return reject(err);
                    } else {
                        return resolve(markup);
                    }
                })
            }
        })
    });
}

module.exports = {
    getRandomDustMarkup: getRandomDustMarkup
};
