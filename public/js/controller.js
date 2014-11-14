var Controller = function(id) {
  if (!id) {
    console.error("ERROR: No id given");
    return;
  }

  var path = "/map/" + id;

  // The renderer renders everything in the #map div
  this.renderer = new Renderer(document.getElementById("map"));
  this.hasInitialized = false;

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
    this.switches = obj.switches;
    this.player1 = obj.players["1"];
    this.player2 = obj.players["2"];

    this.renderer.initializeTiles(this.map);
    //this.renderer.initializeSwitches(this.switches);
    this.renderer.initializePlayer(this.player1);
    this.renderer.initializePlayer(this.player2);
    console.log(this.map);
    console.log(this.player1);
    console.log(this.player2);
    console.log(this.switches);

    // Make sure the Ajax call is done as well as loading the assets
    this.onLoaded();
  }.bind(this));
}

/**
 * To be called by the main JS, script.js
 */
Controller.prototype.render = function() {
  if (!this.hasInitialized) {
    this.renderer.initialRender(this.map);
    this.hasInitialized = true;
  }
  this.renderer.render(this.player1, this.player2, this.switches);
}

Controller.prototype.animate = function() {
  this.renderer.animate(this.player1, this.player2);
}
