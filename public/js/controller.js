var Controller = function(id) {
  if (!id) {
    console.error("ERROR: No id given");
    return;
  }

  var path = "/map/" + id;
  `
  // The renderer renders everything in the #map div
  this.renderer = new Renderer(document.getElementById("map"));
  $.get(path, function(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.objects = data.objects;
    this.goal = data.goal;

    var map = parseMap(data.map);
    this.map = new Map(map, data.width, data.height);

    // Make sure the Ajax call is done as well as loading the assets
    if (this.renderer.isLoaded()) {
      this.onLoaded();
    } else {
      this.renderer.onload = function() {
        this.onLoaded;
      }.bind(this);
    }
  }.bind(this));
}

/**
 * To be called by the main JS, script.js
 */
Controller.prototype.render = function() {
  this.renderer.render(this.map);
}
