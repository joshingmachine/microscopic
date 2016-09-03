// prod utils
function getMapInstance() {
    var maps = getMaps();
    var mapIndex = Math.floor(Math.random()*maps.length);
    return maps[mapIndex];
}

function getFriendsDialog() {
    return [
    ];
}

function getFriends() {
    return [{
        type: "friend",
        dialog: [
            "fm"
        ]
    }, {
        type: "friend",
        dialog
    }]
}

function getPopulatedMap(map) {
    return map.map(function(mapPos) {

    });
}

function getGameInstance() {
    var map = getMapInstance();
    map = getPopulatedMap(map);
}

// dev utils
function spaceOverlaps(posCoord, mapPosCoord) {
    var mapPosLowBound = mapPosCoord - 100;
    var mapPosHighBound = mapPosCoord + 100;

    return (posCoord > mapPosLowBound) && (posCoord < mapPosHighBound);
}

function isPositionValid(position, map) {
    return map.every(function(mapPos) {
        var xOverlaps = spaceOverlaps(position.x, mapPos.x);
        var yOverlaps = spaceOverlaps(position.y, mapPos.y);

        return !(xOverlaps && yOverlaps);
    });
}

function getPosition() {
    var x = Math.floor(Math.random()*1200);
    var y = Math.floor(Math.random()*1200);

    return {
        x: x,
        y: y
    };
}

function getMap() {
    var map = [{
        x: 0,
        y: 0
    }];

    for(var i = 0; i < 15; i++) {
        var positionIsValid = false;

        while(!positionIsValid) {
            var position = getPosition();
            positionIsValid = isPositionValid(position, map);

            if(positionIsValid) {
                map.push(position);
            }
        }
    }

    return map;
}

function getMaps() {
    var maps = [];
    for(var i = 0; i < 10; i++){
      maps.push(getMap());
    }
    return maps;
}


// whatever

function getBacteriaCoordinates() {
    var BACTERIA_COUNT = 16;

    var bacteriaCoordinates = [];

    for(var i = 0; i < BACTERIA_COUNT; i++) {
        var xCoord = Math.random()*1200;
        var yCoord = Math.random()*1200;

        bacteriaCoordinates.push({
            x: xCoord,
            y: yCoord
        });
    }

    return bacteriaCoordinates;
}

module.exports = {
    getBacteriaCoordinates: getBacteriaCoordinates
};
