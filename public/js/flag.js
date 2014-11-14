var Flag = function(player, row, col) {
  this.player = player;
  this.row = row;
  this.col = col;
};

Flag.prototype.initSprite = function(stage, image, size) {
  this.size = size;
  this.sprite = new PIXI.Sprite(image);
  stage.addChild(this.sprite);
  this.sprite.position.x = this.col * this.size;
  this.sprite.position.y = this.row * this.size;
};
