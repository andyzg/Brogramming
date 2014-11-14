(function() {
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
      this.data = data;
      this.reset(data, callback);
    }.bind(this));
    window.initEditor(this);
  };

  Controller.prototype.parseGoal = function (goal, player1, player2) {
    for (key in goal) {
      var location = {};
      location['row'] = goal[key][0];
      location['column'] = goal[key][1];
      if (key == "1") {
        player1.setGoal(location);
      } else if (key == "2") {
        player2.setGoal(location);
      }
    }
  }
  Controller.prototype.reset = function(data, callback) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    $("#description .title").text(this.title);
    $("#description .description").text(this.description);
    this.objects = data.objects;
    this.goal = data.goal;

    var obj = parseMap(data.map);

    this.map = new Map(obj.map, data.width, data.height);
    this.switches = obj.switches;
    this.flags = obj.flags;
    this.fogs = obj.fogs;

    if (this.player1) {
      this.player1.removeSelf();
    }
    if (this.player2) {
      this.player2.removeSelf();
    }

    this.hasInitialized = false;

    this.player1 = obj.players["1"];
    this.player2 = obj.players["2"];

    var goal = this.parseGoal(data.goal, this.player1, this.player2);

    this.renderer.initializeTiles(this.map);
    // this.renderer.initializeSwitches(this.switches);
    this.renderer.initializeFlags(this.flags);
    this.renderer.initializeFogs(this.fogs);
    this.renderer.initializePlayer(this.player1);
    this.renderer.initializePlayer(this.player2);
    this.renderer.render();

    if (callback) {
      callback();
    }
  };

  /**
   * To be called by the main JS, script.js
   */
  Controller.prototype.render = function() {
    // The tiles only need to be rendered once
    if (!this.hasInitialized) {
      this.renderer.initialRender(this.map, this.fogs, this.flags);
      this.hasInitialized = true;
    }
    this.renderer.render();
  };

  console.log("Heeey");
  Controller.prototype.animate = function() {
    this.renderer.animate(this.player1, this.player2);
  };

  Controller.prototype.performActions = function(f1, f2) {
    var b1;
    var b2;
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
        this.renderer.render();
        return;
      }
      this.renderer.render();
      requestAnimationFrame(anim.bind(this));
    };
    anim.apply(this);
    this.renderer.render();
  };

  Controller.prototype.run = function(code) {
    this.stop();
    this.reset(this.data);
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
      worker.postMessage({type: 'next', conditionals: controller.getConditionals(i)})
      return worker;
    });
    setSpinner(true);

    Q.spread(_.map(this.workerDfds, function(dfd) {
      return dfd.promise;
    }), this.tick, setSpinner);
  };

  Controller.prototype.tick = function(result1, result2) {
    var controller = this.controller;
    try {
      controller.performActions(controller.functions[result1], controller.functions[result2]);
    } catch (ex) {
      logResult(ex.toString(), '#console' + 0);
      logResult(ex.toString(), '#console' + 1);
      controller.stop();
    }
    controller.workerDfds = [Q.defer(), Q.defer()];
    Q.spread(_.map(controller.workerDfds, function(dfd) {
      return dfd.promise;
    }), controller.tick, setSpinner);
    setTimeout(function() {
      _.each(controller.workers, function(worker, i) {
        worker.postMessage({type: 'next', conditionals: controller.getConditionals(i)});
      });
    }, 1000);
  };

  Controller.prototype.stop = function() {
    _.each(this.workers, function(worker) {
      worker.terminate();
    });
    this.workers = [];
    setSpinner(false);
  };

  Controller.prototype.isBlocked = function(player) {
    return !player.isValidLocation(player.getCoordinateForward());
  }

  Controller.prototype.getConditionals = function(playerId) {
    var player = playerId == 0 ? this.player1 : this.player2;
    return {
      isBlocked: this.isBlocked(player)
    };
  };

  Controller.prototype.functions = {
    moveForward: Player.prototype.moveForward,
    turnLeft: Player.prototype.turnLeft,
    turnRight: Player.prototype.turnRight
  };

  function setSpinner(visible) {
    $('#executing').css('visibility', visible ? 'visible' : 'hidden');
  }

  function logResult(message, id) {
    $(id).val($(id).val() + message + '\n');
  }

  window.Controller = Controller;
}) ();
