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
