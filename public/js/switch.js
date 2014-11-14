var Switch = function(id, row, col) {
  this.id = id;
  this.row = row;
  this.col = col;
  this.active = Switch.OFF;
}

Switch.prototype.initSprite = function(stage, images, size) {
  this.size = size;
  this.images = images;
  this.sprite = new PIXI.Sprite(images[this.active]);
}

Switch.prototype.getID = function() {
  return this.id;
}

Switch.prototype.setState = function(state) {
  if (!this.sprite) {
    console.log("ERROR: sprite has not been initialized");
    return;
  } else {
    this.active = state;
    this.sprite = new PIXI.Sprite(images[this.active]);
  }
}

Switch.prototype.render = function() {
  if (!this.sprite) {
    console.log("ERROR: Sprite hasn't been initialized yet");
    return;
  }
  this.sprite.position.x = this.col * this.size;
  this.sprite.position.y = this.row * this.size;
}