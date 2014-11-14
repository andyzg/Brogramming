var Controller = function(id) {
  if (!id) {
    console.error("ERROR: No id given");
    return;
  }

  var path = "/map/" + id;
  console.log("ID is " + id + ", file name is " + path);
  this.renderer = new Renderer();
  $.get(path, function(data) {
    console.log("Got the data");
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.objects = data.objects;
    this.goal = data.goal;
    var map = parseMap(data.map);
    this.map = new Map(map, data.width, data.height);
    this.onLoaded();
  }.bind(this));
}

/**
 * To be called by the main JS, script.js
 */
Controller.prototype.render = function() {
  this.renderer.render(this.map);
}
