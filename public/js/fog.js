var Fog = function(row, col) {
  this.row = row;
  this.col = col;
};

Fog.prototype.initSprite = function(stage, image, size) {
  console.log("INIT FOG");
  this.size = size;
  this.sprite = new PIXI.Sprite(image);
  stage.addChild(this.sprite);
  this.sprite.position.x = this.col * this.size;
  this.sprite.position.y = this.row * this.size;
};
