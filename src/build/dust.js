var dustUtils = require("../utils/dust-utils");

// var dustMap = dustUtils.getDustMap();
// dustUtils.writeDustStyles(dustMap);

for(var i=0; i < 100; i++) {
    var dustLayerMarkup = dustUtils.getDustLayerMarkup();
    dustUtils.writeDustMarkup(dustLayerMarkup, i);
}
