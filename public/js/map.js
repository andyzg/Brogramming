var Map = function(map, width, height) {
  this.map = map;
  this.width = width;
  this.height = height;
  this.print();
}

Map.prototype.print = function() {
  for (var i = 0; i < this.map.length; i++) {
    var row = this.map[i].map(function(block) {
      return block.elem;
    });
    console.log(row.join(""));
  }
}

Map.prototype.renderTiles = function(container, sprites, size) {
  var map = this.map;
  for (var x = 0; x < map.length; x++) {
    for (var y = 0; y < map[x].length; y++) {
      var block = map[x][y];
      block.render(size);
    }
  }
}

Map.prototype.initializeTiles = function(container, images) {
  var map = this.map;
  for (var x = 0; x < map.length; x++) {
    for (var y = 0; y < map[x].length; y++) {
      var block = map[x][y];
      console.log("Initializing tiles");
      block.initSprite(container, images);
    }
  }
}
