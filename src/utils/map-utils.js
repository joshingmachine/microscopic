function spaceOverlaps(point, mapPoint, minDistance) {
    var xDif = Math.pow((point.x - mapPoint.x), 2);
    var yDif = Math.pow((point.y - mapPoint.y), 2);
    var distance = Math.sqrt((xDif+yDif));
    return (distance < minDistance);
}

function isPointValid(point, map) {
    return map.every(function(mapPoint) {
        return !spaceOverlaps(point, mapPoint, 5);
    });
}

function getRandomCoordinate() {
    return Math.floor(Math.random()*100);
}

function getRandomPoint() {
    return {
        x: getRandomCoordinate(),
        y: getRandomCoordinate()
    };
}

function addRandomPointToPoints(points=[]) {
    var randomPoint = null;

    // TODO: Do not push `randomPoint` to `points` if
    // `randomPoint` overlaps with any point in `points`

    do {
        randomPoint = getRandomPoint();
        if(isPointInvalid(randomPoint, points)) {
            randomPoint = null;
        }
    } while (randomPoint === null)

    points.push(randomPoint);
}

function getMap(points=[], desiredPointAmount=0) {
    var pointsRemaining = desiredPointAmount - points.length;

    for(var i = 0; i < pointsRemaining; i++) {
        points = addRandomPointToPoints(points);
    }

    return points;
}

function getMaps(desiredMapAmount, desiredPointAmount) {
    var maps = [];

    for(var i = 0; i < desiredMapAmount; i++) {
        maps.push(getMap([], desiredPointAmount));
    }
    
    return maps;
}

module.exports = {
    getMap: getMap,
    getMaps: getMaps
};
