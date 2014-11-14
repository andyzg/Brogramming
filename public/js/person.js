var Player = function(id, row, col) {
  this.id = id;
  this.direction = Direction.BOTTOM;
  this.row = row;
  this.col = col;
  this.isAnimating = false;
  this.goal = {};

  this.startState = 0;
  this.animationSpeed = 0.1;
};

Player.prototype.setMap = function(map) {
  this.map = map;
};

Player.prototype.setGoal = function(location) {
  this.goal = location;
}

Player.prototype.initSprite = function(textures, size) {
  this.size = size;
  this.xPos = this.col * this.size;
  this.yPos = this.row * this.size;
  this.counter = this.size;

  this.textures = textures;
  this.sprite = new PIXI.Sprite(textures[this.direction]);
  // Sets the default direction as bottom
};

Player.prototype.initAnimations = function(stage, animations) {
  this.anim = animations;
  this.anim[this.direction].gotoAndStop(this.startState);
  this.stage = stage;
  this.resetLocation();
  stage.addChild(this.anim[this.direction]);
};

Player.prototype.resetState = function() {
  this.anim[this.direction].gotoAndStop(this.startState);
};

Player.prototype.getID = function() {
  return this.id;
};

Player.prototype.at = function(row, col) {
  return row == this.row && col == this.col;
};

Player.prototype.getLocationValue = function(location) {
  if (location === undefined) {
    location = {col: this.col, row: this.row};
  }
  return this.map[location.row][location.col] ?
    this.map[location.row][location.col].getElement() : null;
};

Player.prototype.turnLeft = function() {
  this.stage.removeChild(this.anim[this.direction]);
  var newDir = this.direction - 1;
  this.direction = newDir < 0 ? newDir + 4 : newDir;
  this.stage.addChild(this.anim[this.direction]);
  this.resetLocation();
  return false;
};

Player.prototype.turnRight = function() {
  this.stage.removeChild(this.anim[this.direction]);
  var newDir = this.direction + 1;
  this.direction = newDir % 4;
  this.stage.addChild(this.anim[this.direction]);
  this.resetLocation();
  return false;
};

Player.prototype.resetLocation = function() {
  this.anim[this.direction].position.x = this.col * this.size;
  this.anim[this.direction].position.y = this.row * this.size;
};

Player.prototype.getCoordinateForward = function() {
  var col = this.col;
  var row = this.row;
  switch (this.direction) {
    case Direction.TOP:
      return {col: col, row: row - 1};
    case Direction.RIGHT:
      return {col: col + 1, row: row};
    case Direction.BOTTOM:
      return {col: col, row: row + 1};
    case Direction.LEFT:
      return {col: col - 1, row: row};
    default:
      throw('wtf?');
  }
};

Player.prototype.isValidLocation = function(location) {
  if (location.row < 0 || location.row >= this.map.length || location.col < 0 ||
    location.col >= this.map[0].length) {
    return false;
  }
  var locationType = this.getLocationValue(location);
  return locationType == Tile.PATH || locationType == Tile.SWITCH;
};

Player.prototype.isOnGoal = function(location) {
  console.log("checking for goal");
  if ((location.row == this.goal.row) && (location.col==this.goal.column)) {
    return true;
  }
  return false;
}

Player.prototype.isOnSwitch = function(location) {
  if (location.row < 0 || location.row >= this.map.length || location.col < 0 ||
    location.col >= this.map[0].length) {
    return false;
  }
  var locationType = this.getLocationValue(location);
  return locationType == Tile.PATH || locationType == Tile.SWITCH;
};

/**
 * Calling this function assumes that it's possible to walk forward
 * To animate, first call moveForward. This returns a callback to be called
 * The callback should be called every time unless
 */
Player.prototype.moveForward = function() {
  var location = this.getCoordinateForward();
  if (!this.isValidLocation(location)) {
    throw 'Cannot move forward';
  }

  if (this.isOnGoal(location)) {
    console.log("Player " + this.id + " on goal");
  }

  this.col = location.col;
  this.row = location.row;
  this.xPos = location.col * this.size;
  this.yPos = location.row * this.size;
  this.counter = this.size;

  this.anim[this.direction].play();
  this.anim[this.direction].animationSpeed = this.animationSpeed;
  this.isAnimating = true;
  return this.animate;
};

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
};

Player.prototype.removeSelf = function() {
  if (this.stage) {
    this.stage.removeChild(this.sprite);
  }
};
