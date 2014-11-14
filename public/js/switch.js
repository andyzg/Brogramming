var Switch = function(id, row, col) {
  this.id = id;
  this.row = row;
  this.col = col;
  this.active = SwitchValue.OFF;
}

Switch.prototype.initSprite = function(stage, images, size) {
  this.size = size;
  this.images = images;
  this.sprite = new PIXI.Sprite(images[this.active]);
  stage.addChild(this.sprite);
}

Switch.prototype.getID = function() {
  return this.id;
}

Switch.prototype.setState = function(stage, state) {
  if (!this.sprite) {
    console.log("ERROR: sprite has not been initialized");
    return;
  } else {
    if (state){
      this.active = SwitchValue.OFF;
    } else {
      this.active = SwitchValue.ON;
    }
    this.sprite = new PIXI.Sprite(this.images[this.active]);
    stage.addChild(this.sprite);
  }
}

Switch.prototype.render = function() {
  if (!this.sprite) {
    console.log("ERROR: Sprite hasn't been initialized yet");
    return;
  }
  this.sprite.position.x = this.col * this.size + (this.size-50)/2;
  this.sprite.position.y = this.row * this.size + (this.size-50)/2;
}