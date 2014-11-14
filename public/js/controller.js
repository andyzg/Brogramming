var Controller = function(id) {
  if (!id) {
    console.error("ERROR: No id given");
    return;
  }

  var path = "/map/" + id;

  // The renderer renders everything in the #map div
  this.renderer = new Renderer(document.getElementById("map"));
  console.log("Just finished creating renderer");
  $.get(path, function(data) {
    console.log("Done ajax");
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.objects = data.objects;
    this.goal = data.goal;

    console.log("Done ajax request");
    var obj = parseMap(data.map);
    this.map = new Map(obj.map, data.width, data.height);
    this.players = obj.players;
    this.renderer.initializeTiles(this.map);
    console.log(this.map);
    console.log(this.players);

    // Make sure the Ajax call is done as well as loading the assets
    this.onLoaded();
  }.bind(this));
}

/**
 * To be called by the main JS, script.js
 */
Controller.prototype.render = function() {
  this.renderer.render(this.map);
}
