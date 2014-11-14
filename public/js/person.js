var Player = function(id, row, col) {
  this.id = id;
  this.direction = Direction.BOTTOM;
  this.row = row;
  this.col = col;
  this.isAnimating = false;

  this.startState = 0;
  this.animationSpeed = 0.1;
}

Player.prototype.setMap = function(map) {
  this.map = map;
}

Player.prototype.initSprite = function(textures, size) {
  this.size = size;
  this.xPos = this.col * this.size;
  this.yPos = this.row * this.size;
  this.counter = this.size;

  this.textures = textures;
  this.sprite = new PIXI.Sprite(textures[this.direction]);
  // Sets the default direction as bottom
}

Player.prototype.initAnimations = function(stage, animations) {
  this.anim = animations;
  this.anim[this.direction].gotoAndStop(this.startState);
  this.stage = stage;
  this.resetLocation();
  stage.addChild(this.anim[this.direction]);
}

Player.prototype.resetState = function() {
  this.anim[this.direction].gotoAndStop(this.startState);
}

Player.prototype.getID = function() {
  return this.id;
}

Player.prototype.at = function(row, col) {
  return row == this.row && col == this.col;
}

Player.prototype.turnLeft = function() {
  this.stage.removeChild(this.anim[this.direction]);
  var newDir = this.direction - 1;
  this.direction = newDir < 0 ? newDir + 4 : newDir;
  this.stage.addChild(this.anim[this.direction]);
  this.resetLocation();
  return false;
}

Player.prototype.turnRight = function() {
  this.stage.removeChild(this.anim[this.direction]);
  var newDir = this.direction + 1;
  this.direction = newDir % 4;
  this.stage.addChild(this.anim[this.direction]);
  this.resetLocation();
  return false;
}

Player.prototype.resetLocation = function() {
  this.anim[this.direction].position.x = this.col * this.size;
  this.anim[this.direction].position.y = this.row * this.size;
}

/**
 * Calling this function assumes that it's possible to walk forward
 * To animate, first call moveForward. This returns a callback to be called
 * The callback should be called every time unless
 */
Player.prototype.moveForward = function() {
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
    default:
      throw "ERROR: The direction doesn't exist";
      return;
  }
  this.xPos = this.col * this.size;
  this.yPos = this.row * this.size;
  this.counter = this.size;

  this.anim[this.direction].play();
  this.anim[this.direction].animationSpeed = this.animationSpeed;
  this.isAnimating = true;
  return this.animate;
}

Player.prototype.animate = function() {
  if (!this.isAnimating) {
    return false;
  }

  // We decrement the counter until we reach 0
  this.counter = this.counter - 2;
  var position = this.anim[this.direction].position;
  switch (this.direction) {
    case Direction.TOP:
      position.y = this.yPos + this.counter;
      break;
    case Direction.RIGHT:
      position.x = this.xPos - this.counter;
      break;
    case Direction.BOTTOM:
      position.y = this.yPos - this.counter;
      break;
    case Direction.LEFT:
      position.x = this.xPos + this.counter;
      break;
  }

  if (this.counter < 0) {
    this.counter = this.size;
    this.isAnimating = false;
    this.resetLocation();
    return false;
  } else {
    return true;
  }
}
