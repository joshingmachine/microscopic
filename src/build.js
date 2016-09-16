function getRandomCoordinate() {
  return Math.floor(Math.random()*101);
}

function getRandomCoordinatePair() {
  return {
    x: getRandomCoordinate(),
    y: getRandomCoordinate()
  }
}


function isProposedValid(proposed, pairs) {
  return pairs.every(function(pair) {
    var pairXMin = pair.x - 2;
    var pairXMax = pair.x + 2;
    var pairYMin = pair.y - 2;
    var pairYMax = pair.y + 2;

    var inXBounds = proposed.x > pairXMin && proposed.x < pairXMax;
    var inYBounds = proposed.y > pairYMin && proposed.y < pairYMax;

    return !(inXBounds && inYBounds);
  });
}


function getCoordinatePairs() {
  var coordinatePairs = [];

  for(var i=0; i<26; i++) {
    var thing = false;
      while(!thing) {
        var proposedCoordinatePair = getRandomCoordinatePair();
        var proposedIsValid = isProposedValid(proposedCoordinatePair, coordinatePairs);

        if(proposedIsValid) {
           proposedCoordinatePair.n = i;
           coordinatePairs.push(proposedCoordinatePair);
           thing = true;
        }
      }
    }

    return coordinatePairs;
}

function printCoordinatePairs(coordinatePairs) {
  coordinatePairs.forEach(function(coordinatePair) {
    console.log("n", coordinatePair.n, "x", coordinatePair.x, "y", coordinatePair.y);
  })
}

function main() {
  var coordinatePairs = getCoordinatePairs();
  printCoordinatePairs(coordinatePairs);
}


main();
