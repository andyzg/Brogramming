var Block = function(elem, row, col) {
  this.elem = elem;
  this.row = row;
  this.col = col;
  this.sprite = null;
}

Block.prototype.initSprite = function(container, images) {
  var texture = images[this.elem];
  this.sprite = new PIXI.Sprite(texture);
  container.addChild(this.sprite);
}

Block.prototype.render = function(size) {
  if (!this.sprite) {
    console.log("ERROR: Sprite hasn't been initialized yet");
    return;
  }
  this.sprite.position.x = this.col * size;
  this.sprite.position.y = this.row * size;
}

Block.prototype.getElement = function() {
  return this.elem;
}
