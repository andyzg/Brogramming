var Block = function(elem, x, y) {
  this.elem = elem;
  switch(elem) {
    case Block.WATER:
      this.image = "water.png"
      break;
  }
  this.x = x;
  this.y = y;
}

Block.prototype.draw = function() {
  // TODO Draw the element

}
