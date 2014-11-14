var Renderer = function(dom, width, height) {
  // Define rendering objects
  console.log("Hey");
  this.renderer = PIXI.autoDetectRecommendedRenderer(800, 640);
  this.stage = new PIXI.Stage(0xFFFFFF);
  this.tileContainer = new PIXI.DisplayObjectContainer();
  this.stage.addChild(this.tileContainer);

  // Define assets
  this.playerTexture = loadPlayerImages();
  this.playerAnimations = loadPlayerAnimations();
  this.switchTexture = loadSwitchImages();
  this.tileImages = loadTileImages();

  // Define constants
  this.tileSize = 64;
  dom.appendChild(this.renderer.view);
}

Renderer.prototype.initialRender = function(map) {
  map.renderTiles(this.tileContainer, this.tileImages, this.tileSize);
  this.renderer.render(this.stage);
}

Renderer.prototype.initializeTiles = function(map) {
  console.log("Initializing tiles");
  map.initializeTiles(this.tileContainer, this.tileImages);
}


Renderer.prototype.initializeSwitches = function(switches) {
  console.log("Initializing switches");
  for (var i = 0; i < switches.length; i++) {
    switches[i].initSprite(this.stage, this.switchTexture, this.tileSize);
  }
}

Renderer.prototype.render = function(player1, player2, switches) {
  console.log("Rendering");
  player1.render(this.tileSize);
  player2.render(this.tileSize);
  for (var i = 0; i < switches.length; i++) {
    switches[i].render();
  }

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

function loadSwitchImages() {
  var assets = {};
  assets[Switch.ON] = PIXI.Texture.fromImage("/img/switch/on.png");
  assets[Switch.OFF] = PIXI.Texture.fromImage("/img/switch/off.png");
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

