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
  var flags = {};
  var fogs = [];
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

      } else if (block == Tile.BLUE_FLAG || block == Tile.RED_FLAG) {
        arr[row][column] = new Block(Tile.PATH, row, column);
        var player;
        if (block == Tile.BLUE_FLAG) {
          player = "1";
        } else if (block == Tile.RED_FLAG) {
          player = "2";
        } else {
          throw "ERROR: Invalid flag";
        }
        flags[player] = new Flag(player, row, column);

      } else if (block == Tile.FOG_PATH || block == Tile.FOG_WALL) {
        var elem;
        if (block == Tile.FOG_PATH) {
          elem = Tile.PATH;
        } else if (block == Tile.FOG_WALL) {
          elem = Tile.WALL;
        } else {
          throw "ERROR: Invalid fog";
        }
        arr[row][column] = new Block(elem, row, column);
        fogs.push(new Fog(row, column));

      } else {
        arr[row][column] = new Block(block, row, column);
      }
    }
  }

  for (var key in players) {
    if (players.hasOwnProperty(key)) {
      players[key].setMap(arr);
    }
  }

  return {
    map: arr,
    players: players,
    switches: switches,
    flags: flags,
    fogs: fogs
  };
}
