/**
 * Returns a 2D array of objects containing info
 * on each part of the map
 * @param {array} map - array of strings
 * @return {array} map - 2D array of objects
 */
function parseMap(map) {
  // Row <-> height
  // Column <-> width
  var arr = new2DArray(map.length, map[0].length);
  for (var row = 0; row < map.length; row++) {
    for (var column = 0; column < this.width; column++) {
      arr[row][column] = new Block(map[row][column]);
    }
  }
  console.log(arr);
  return arr;
}


