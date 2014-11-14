var Renderer = function(dom, width, height) {
  // Define rendering objects
  this.renderer = PIXI.autoDetectRecommendedRenderer(550, 550);
  this.stage = new PIXI.Stage(0x232C31);
  this.tileContainer = new PIXI.DisplayObjectContainer();
  this.stage.addChild(this.tileContainer);

  // Define assets
  this.playerTexture = loadPlayerImages();
  this.playerAnimations = loadPlayerAnimations();
  this.switchTexture = loadSwitchImages();
  this.tileImages = loadTileImages();
  this.flagImages = loadFlagImages();
  this.fogImage = loadFogImage();

  // Define constants
  this.tileSize = 64;
  dom.appendChild(this.renderer.view);
}

Renderer.prototype.initialRender = function(map, fogs, flags) {
  map.renderTiles(this.tileContainer, this.tileImages, this.tileSize);
  this.renderer.render(this.stage);
}

Renderer.prototype.initializeTiles = function(map) {
  console.log("Initializing tiles");
  map.initializeTiles(this.tileContainer, this.tileImages, this.tileSize);
}


Renderer.prototype.initializeSwitches = function(switches) {
  console.log("Initializing switches");
  for (var i = 0; i < switches.length; i++) {
    switches[i].initSprite(this.stage, this.switchTexture, this.tileSize);
  }
}

Renderer.prototype.initializeFlags = function(flags) {
  console.log("Initializing flags");
  for (var i in flags) {
    if (flags.hasOwnProperty(i)) {
      flags[i].initSprite(this.stage, this.flagImages[i], this.tileSize);
    } else {
      console.log("ERROR: Invalid key");
    }
  }
}

Renderer.prototype.initializeFogs = function(fogs) {
  console.log("Initializing fogs");
  for (var i = 0; i < fogs.length; i++) {
    fogs[i].initSprite(this.stage, this.fogImage, this.tileSize);
  }
}

Renderer.prototype.render = function() {
  this.renderer.render(this.stage);
}

Renderer.prototype.initializePlayer = function(player) {
  switch (player.getID()) {
    case "1":
      player.initSprite(this.playerTexture["1"], this.tileSize);
      player.initAnimations(this.stage, this.playerAnimations["1"]);
      break;
    case "2":
      player.initSprite(this.playerTexture["2"], this.tileSize);
      player.initAnimations(this.stage, this.playerAnimations["2"]);
      break;
    default:
      console.log("ERROR: Unknown player name.");
  }
}

Renderer.prototype.animate = function(player1, player2) {
  player1.animate();
  this.renderer.render(this.stage);
}

function loadFogImage() {
  return PIXI.Texture.fromImage("/img/fog.png");
}

function loadSwitchImages() {
  var assets = {};
  assets[SwitchValue.ON] = PIXI.Texture.fromImage("/img/switch/on-no-background.png");
  assets[SwitchValue.OFF] = PIXI.Texture.fromImage("/img/switch/off-no-background.png");
  return assets;
}

function loadFlagImages() {
  var assets = {};
  assets[Tile.PLAYER_ONE] = PIXI.Texture.fromImage("/img/flags/red_flag.png");
  assets[Tile.PLAYER_TWO] = PIXI.Texture.fromImage("/img/flags/blue_flag.png");
  return assets;
}

function loadPlayerImages() {
  var p1 = {};
  var p2 = {};
  p1[Direction.TOP] = PIXI.Texture.fromImage("/img/sprite/blue_top.png");
  p1[Direction.RIGHT] = PIXI.Texture.fromImage("/img/sprite/blue_right.png");
  p1[Direction.BOTTOM] = PIXI.Texture.fromImage("/img/sprite/blue_bottom.png");
  p1[Direction.LEFT] = PIXI.Texture.fromImage("/img/sprite/blue_left.png");

  p2[Direction.TOP] = PIXI.Texture.fromImage("/img/sprite/red_top.png");
  p2[Direction.RIGHT] = PIXI.Texture.fromImage("/img/sprite/red_right.png");
  p2[Direction.BOTTOM] = PIXI.Texture.fromImage("/img/sprite/red_bottom.png");
  p2[Direction.LEFT] = PIXI.Texture.fromImage("/img/sprite/red_left.png");
  return {
    "1": p1,
    "2": p2
  };
}

function loadPlayerAnimations() {
  var p1 = {};
  var p2 = {};
  p1[Direction.TOP] = getAnimation("blue", "up");
  p1[Direction.RIGHT] = getAnimation("blue", "right");
  p1[Direction.BOTTOM] = getAnimation("blue", "down");
  p1[Direction.LEFT] = getAnimation("blue", "left");

  p2[Direction.TOP] = getAnimation("red", "up");
  p2[Direction.RIGHT] = getAnimation("red", "right");
  p2[Direction.BOTTOM] = getAnimation("red", "down");
  p2[Direction.LEFT] = getAnimation("red", "left");
  return {
    "1": p1,
    "2": p2
  };
}

function getAnimation(color, dir) {
  var anim = [];
  for (var i = 0; i < 4; i++) {
    var path = "/img/animation/student_" + dir + "_" + color + i.toString() + ".png";
    var frame = PIXI.Texture.fromImage(path);
    anim.push(frame);
  }
  return new PIXI.MovieClip(anim);
}

function loadTileImages() {
  var assets = {};
  assets[Tile.PATH] = PIXI.Texture.fromImage("/img/tiles/grass.png");
  assets[Tile.WALL] = PIXI.Texture.fromImage("/img/tiles/wall.png");
  assets[Tile.WATER] = PIXI.Texture.fromImage("/img/tiles/water.png");
  return assets;
}
