var Renderer = function() {
  // TODO: Write out all of the things needed to be initialized to render
  // as well as all of the assets
  this.stage = new PIXI.Stage(0xDDDDDD);
  var texture = PIXI.Texture.fromImage("img/sprite/red_right.png");
}

Renderer.prototype.render = function(map) {
  // TODO: Render every block in the map
}

function loadPersonAssets() {
  var p1 = {};
  var p2 = {};
  p1[Direction.TOP] = new PIXI.Sprite(PIXI.Texture.fromImage("blue_top.png"));
  p1[Direction.TOP] = new PIXI.Sprite(PIXI.Texture.fromImage("blue_top.png"));
  p1[Direction.TOP] = new PIXI.Sprite(PIXI.Texture.fromImage("blue_top.png"));
  p1[Direction.TOP] = new PIXI.Sprite(PIXI.Texture.fromImage("blue_top.png"));

  p2[Direction.TOP] = new PIXI.Sprite(PIXI.Texture.fromImage("red_top.png"));
  p2[Direction.TOP] = new PIXI.Sprite(PIXI.Texture.fromImage("red_top.png"));
  p2[Direction.TOP] = new PIXI.Sprite(PIXI.Texture.fromImage("red_top.png"));
  p2[Direction.TOP] = new PIXI.Sprite(PIXI.Texture.fromImage("red_top.png"));
  return [p1, p2];
}

function loadTileAssets() {
  var assets = {};
  assets[Block.PATH] = new PIXI.Sprite(PIXI.Texture.fromImage("path.png"));
  assets[Block.WALL] = new PIXI.Sprite(PIXI.Texture.fromImage("wall.png"));
  assets[Block.WATER] = new PIXI.Sprite(PIXI.Texture.fromImage("water.png"));
  return assets;
}
