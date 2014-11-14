var Player = function(id, row, col) {
  this.id = id;
  this.direction = Direction.RIGHT;
  this.row = row;
  this.col = col;
}

Player.prototype.initSprite = function(stage, textures) {
  this.textures = textures;
  this.sprite = new PIXI.Sprite(textures[this.direction]);
  // Sets the default direction as bottom
  stage.addChild(this.sprite);
}

Player.prototype.initAnimations = function(animations) {
  this.anim = animations;
}

Player.prototype.render = function(size) {
  if (!this.sprite) {
    console.log("ERROR: Player has not been initialized yet");
    return;
  }
  this.sprite.position.x = this.col * size;
  this.sprite.position.y = this.row * size;
  console.log(this.sprite.position.x);
  console.log(this.sprite.position.y);
}

Player.prototype.getID = function() {
  return this.id;
}

Player.prototype.turnLeft = function() {
  var newDir = this.direction - 1;
  this.direction = newDir < 0 ? newDir + 4 : newDir;
}

Player.prototype.turnRight = function() {
  var newDir = this.direction + 1;
  this.direction = newDir % 4;
}

Player.prototype.moveDown = function(size) {

}
