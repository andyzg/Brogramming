var Player = function(id, row, col) {
  this.id = id;
  this.direction = Direction.BOTTOM;
  this.row = row;
  this.col = col;
  this.startState = 0;
  this.counter = 0;
}

Player.prototype.initSprite = function(stage, textures, size) {
  this.size = size;
  this.textures = textures;
  this.sprite = new PIXI.Sprite(textures[this.direction]);
  // Sets the default direction as bottom
}

Player.prototype.initAnimations = function(stage, animations) {
  this.anim = animations;
  this.anim[this.direction].gotoAndStop(this.startState);
  stage.addChild(this.anim[this.direction]);
}

Player.prototype.render = function() {
  if (!this.sprite) {
    console.log("ERROR: Player has not been initialized yet");
    return;
  }
  this.anim[this.direction].position.x = this.col * this.size;
  this.anim[this.direction].position.y = this.row * this.size;
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

/**
 * Calling this function assumes that it's possible to walk forward
 */
Player.prototype.moveForward = function() {
  this.anim[this.direction].play();
  switch (this.direction) {
    case Direction.TOP:
      this.row = this.row - 1;
      break;
    case Direction.RIGHT:
      this.col = this.col + 1;
      break;
    case Direction.BOTTOM:
      this.row = this.row + 1;
      break;
    case Direction.LEFT:
      this.col = this.col - 1;
      break;
  }
  console.log(this.anim[this.direction].playing, this.row, this.col);
}

Player.prototype.animate = function() {
  console.log(this.anim[this.direction].currentFrame);
  this.counter = this.counter + 2;
  var position = this.anim[this.direction].position;
  switch (this.direction) {
    case Direction.TOP:
      position.y = position.y - 1;
      break;
    case Direction.RIGHT:
      position.x = position.x + 1;
      break;
    case Direction.BOTTOM:
      position.y = position.y + 1;
      break;
    case Direction.LEFT:
      position.x = position.x - 1;
      break;
  }

  if (this.counter >= this.size) {
    this.counter = 0;
    return false;
  } else {
    return true;
  }
}
