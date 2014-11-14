var Controller = function(id, callback) {
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
    this.renderer.initializeSwitches(this.switches);
    this.renderer.initializePlayer(this.player1);
    this.renderer.initializePlayer(this.player2);
    console.log(this.map);
    console.log(this.player1);
    console.log(this.player2);
    console.log(this.switches);

    callback();

  }.bind(this));
}

/**
 * To be called by the main JS, script.js
 */
Controller.prototype.render = function() {
  // The tiles only need to be rendered once
  if (!this.hasInitialized) {
    this.renderer.initialRender(this.map);
    this.hasInitialized = true;
  }
  this.renderer.render(this.player1, this.player2, this.switches);
}

Controller.prototype.animate = function() {
  this.renderer.animate(this.player1, this.player2);
}

Controller.prototype.run = function(f1, f2) {
  var b1 = true;
  var b2 = true;
  var anim1;
  var anim2;
  if (f1) {
    b1 = anim1 = f1.apply(this.player1);
  }
  if (f2) {
    b2 = anim2 = f2.apply(this.player2);
  }

  function anim() {
    if (b1) {
      b1 = anim1.apply(this.player1);
    }
    if (b2) {
      b2 = anim2.apply(this.player2);
    }
    if (!b1 && !b2) {
      this.player1.resetState();
      this.player2.resetState();
      this.renderer.render(this.player1, this.player2);
      return;
    }
    this.renderer.render(this.player1, this.player2);
    requestAnimationFrame(anim.bind(this));
  };
  anim.apply(this);
  this.renderer.render(this.player1, this.player2);
}
