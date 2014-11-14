var Player = function(id, row, col) {
  this.id = id;
  this.direction = Direction.BOTTOM;
  this.row = row;
  this.col = col;
  this.startState = 0;
  this.animationSpeed = 0.1;
  this.counter = 0;
}

Player.prototype.initSprite = function(textures, size) {
  this.size = size;
  this.textures = textures;
  this.sprite = new PIXI.Sprite(textures[this.direction]);
  // Sets the default direction as bottom
}

Player.prototype.initAnimations = function(stage, animations) {
  this.anim = animations;
  this.anim[this.direction].gotoAndStop(this.startState);
  this.stage = stage;
  stage.addChild(this.anim[this.direction]);
}

/**
 * Renders the location of the sprite
 */
Player.prototype.render = function() {
  if (!this.sprite) {
    console.log("ERROR: Player has not been initialized yet");
    return;
  }
  switch (this.direction) {
    case Direction.TOP:
      this.anim[this.direction].position.x = this.col * this.size;
      this.anim[this.direction].position.y = this.row * this.size - this.counter;
      break;
    case Direction.BOTTOM:
      this.anim[this.direction].position.x = this.col * this.size;
      this.anim[this.direction].position.y = this.row * this.size + this.counter;
      break;
    case Direction.RIGHT:
      this.anim[this.direction].position.x = this.col * this.size + this.counter;
      this.anim[this.direction].position.y = this.row * this.size;
      break;
    case Direction.LEFT:
      this.anim[this.direction].position.x = this.col * this.size + this.counter;
      this.anim[this.direction].position.y = this.row * this.size;
      break;
  }
}

Player.prototype.resetState = function() {
  this.anim[this.direction].gotoAndStop(this.startState);
}

Player.prototype.getID = function() {
  return this.id;
}

Player.prototype.turnLeft = function() {
  this.stage.removeChild(this.anim[this.direction]);
  var newDir = this.direction - 1;
  this.direction = newDir < 0 ? newDir + 4 : newDir;
  this.stage.addChild(this.anim[this.direction]);
  return false;
}

Player.prototype.turnRight = function() {
  this.stage.removeChild(this.anim[this.direction]);
  var newDir = this.direction + 1;
  this.direction = newDir % 4;
  this.stage.addChild(this.anim[this.direction]);
  return false;
}

/**
 * Calling this function assumes that it's possible to walk forward
 */
Player.prototype.moveForward = function() {
  this.anim[this.direction].play();
  this.anim[this.direction].animationSpeed = this.animationSpeed;
  return this.animate;
}

Player.prototype.animate = function() {
  this.counter = this.counter + 2;
  var position = this.anim[this.direction].position;
  switch (this.direction) {
    case Direction.TOP:
      position.y = position.y - 2;
      break;
    case Direction.RIGHT:
      position.x = position.x + 2;
      break;
    case Direction.BOTTOM:
      position.y = position.y + 2;
      break;
    case Direction.LEFT:
      position.x = position.x - 2;
      break;
  }

  if (this.counter >= this.size) {
    this.counter = 0;
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
    return false;
  } else {
    return true;
  }
}
