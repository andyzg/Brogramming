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

    window.initEditor(this);
  }.bind(this));
};

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
};

Controller.prototype.animate = function() {
  this.renderer.animate(this.player1, this.player2);
};

Controller.prototype.performActions = function(f1, f2) {
  console.log(this);
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
      this.renderer.render(this.player1, this.player2, this.switches);
      return;
    }
    this.renderer.render(this.player1, this.player2, this.switches);
    requestAnimationFrame(anim.bind(this));
  };
  anim.apply(this);
  this.renderer.render(this.player1, this.player2, this.switches);
};

Controller.prototype.run = function(code) {
  var controller = this;
  this.workerDfds = [Q.defer(), Q.defer()];
  this.workers = _.map(code, function(item, i) {
    var worker = new Worker('js/userCodeWorker.js');
    var id = '#console' + i;
    worker.addEventListener("message", function(e) {
      if (e.data.type === 'log') {
        logResult(e.data.value, id);
      } else if (e.data.type === 'action') {
        if (!e.data.value.done) {
          logResult(e.data.value.value, id); // TODO change to process data
          controller.workerDfds[i].resolve(e.data.value.value);
        } else {
          controller.workerDfds[i].reject();
        }
      }
    });
    worker.postMessage({type: 'begin', value: item});
    worker.postMessage({type: 'next'})
    return worker;
  });

  Q.spread(_.map(this.workerDfds, function(dfd) {
    return dfd.promise;
  }), this.tick);
};

Controller.prototype.tick = function(result1, result2) {
  var controller = this.controller;
  controller.performActions(controller.functions[result1], controller.functions[result2]);
  controller.workerDfds = [Q.defer(), Q.defer()];
  Q.spread(_.map(controller.workerDfds, function(dfd) {
    return dfd.promise;
  }), this.tick);
  _.each(controller.workers, function(worker) {
    worker.postMessage({type: 'next'});
  });
};

Controller.prototype.stop = function() {
  _.each(this.workers, function(worker) {
    worker.terminate();
  });
  workers = [];
};

Controller.prototype.functions = {
  moveForward: Player.prototype.moveForward,
  turnLeft: Player.prototype.turnLeft,
  turnRight: Player.prototype.turnRight
};

function logResult(message, id) {
  $(id).val($(id).val() + message + '\n');
}