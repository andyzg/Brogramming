/**
 * Returns a 2D array of objects containing info
 * on each part of the map
 * @param {array} map - array of strings
 * @return {array} map - 2D array of objects
 */
function parseMap(map) {
  // Row <-> height
  // Column <-> width
  var players = {};
  var switches = [];
  var arr = new2DArray(map.length, map[0].length);
  for (var row = 0; row < map.length; row++) {
    for (var column = 0; column < map[row].length; column++) {
      var block = map[row][column];
      if (block == Tile.PLAYER_TWO || block == Tile.PLAYER_ONE) {
        arr[row][column] = new Block(Tile.PATH, row, column);
        players[block] = new Player(block, row, column);
      } else if (block == Tile.SWITCH) {
        arr[row][column] = new Block(Tile.PATH, row, column);
        switches.push(new Switch(switches.length, row, column));
      } else {
        arr[row][column] = new Block(block, row, column);
      }
    }
  }
  return {
    map: arr,
    players: players,
    switches: switches
  };
}


