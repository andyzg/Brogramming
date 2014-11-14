var Renderer = function(dom, width, height) {
  // Define rendering objects
  console.log("Hey");
  this.renderer = PIXI.autoDetectRecommendedRenderer(800, 640);
  this.stage = new PIXI.Stage(0xFFFFFF);
  this.tileContainer = new PIXI.DisplayObjectContainer();
  this.stage.addChild(this.tileContainer);

  // Define assets
  this.playerImages = loadPlayerImages();
  this.tileImages = loadTileImages();

  // Define constants
  this.tileSize = 64;
  dom.appendChild(this.renderer.view);
}

Renderer.prototype.render = function(map) {
  // TODO: Render every block in the map
  map.renderTiles(this.tileContainer, this.tileImages, this.tileSize);
  this.renderer.render(this.stage);
}

Renderer.prototype.initializeTiles = function(map) {
  console.log("Initializing tiles");
  map.initializeTiles(this.tileContainer, this.tileImages);
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
  return [p1, p2];
}

function loadTileImages() {
  var assets = {};
  assets[Tile.PATH] = PIXI.Texture.fromImage("/img/tiles/grass.png");
  assets[Tile.WALL] = PIXI.Texture.fromImage("/img/tiles/wall.png");
  assets[Tile.WATER] = PIXI.Texture.fromImage("/img/tiles/water.png");
  return assets;
}
