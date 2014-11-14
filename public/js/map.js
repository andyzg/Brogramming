var Map = function(id) {
  if (!id) {
    console.error("ERROR: No id given");
    return;
  }

  this.loaded = false;
  this.stage = new PIXI.Stage(0xDDDDDD);
  this.renderer = PIXI.autoDetectRenderer(640, 480);
  var path = "/map/" + id;
  console.log("ID is " + id + ", file name is " + path);
  $.get(path, function(data) {
    console.log("Got the data");
    this.id = data.id;
    this.title = data.title;
    this.width = data.width;
    this.height = data.height;
    this.description = data.description;
    this.objects = data.objects;
    this.goal = data.goal;
    this.loaded = true;
    this.map = this.parseMap(data.map);
    this.onLoaded();
  }.bind(this));
}

Map.prototype.print = function() {
  console.log(this);
}

/**
 * Returns a 2D array of objects containing info
 * on each part of the map
 * @param {array} map - array of strings
 * @return {array} map - 2D array of objects
 */
Map.prototype.parseMap = function(map) {
  assert(map.length == this.height);

  // Row <-> height
  // Column <-> width
  console.log(this.height, this.width);
  var arr = new2DArray(this.height, this.width);
  for (var row = 0; row < this.height; row++) {
    assert(map.length == this.width);
    for (var column = 0; column < this.width; column++) {
      arr[row][column] = new Block(map[row][column]);
    }
  }
  console.log(arr);
  return arr;
}


