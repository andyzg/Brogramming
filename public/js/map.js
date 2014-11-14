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
  for (var row = 0; row < map.length; row++) {
    for (var col = 0; col < map[row].length; col++) {
      var block = map[row][col];
      block.render(size);
    }
  }
}

Map.prototype.initializeTiles = function(container, images) {
  var map = this.map;
  for (var row = 0; row < map.length; row++) {
    for (var col = 0; col < map[row].length; col++) {
      var block = map[row][col];
      console.log("Initializing tiles");
      block.initSprite(container, images);
    }
  }
}
