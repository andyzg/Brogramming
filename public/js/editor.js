(function() {

  var commandsRef;
  var firepads = [];
  var lastCommand;
  var controller;

  function init(ctrl) {
    controller = ctrl;
    // Initialize Firebase.
    var refs = getRandomRef();

    for (var i = 0; i < refs.length; i++) {
      // Create ACE
      var editor = ace.edit("pad" + i);
      editor.setTheme("ace/theme/textmate");
      var session = editor.getSession();
      session.setUseWrapMode(true);
      session.setUseWorker(false);
      session.setMode("ace/mode/javascript");

      // Create Firepad.
      firepads.push(Firepad.fromACE(refs[i], editor, {
        defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
      }));
    }

    commandsRef = refs[0].child('commands');
    commandsRef.on('child_added', onCommand);

    document.getElementById('evaluate').addEventListener('click', function () {
      run();
      lastCommand = Math.random();
      commandsRef.push({type: 'run', id: lastCommand});
    });

    document.getElementById('stop').addEventListener('click', function() {
      controller.stop();
    });
  }

  // Helper to get hash from end of URL or generate a random one.
  function getRandomRef() {
    var delimiter = '+';
    var baseRef = new Firebase('https://brogramming.firebaseio.com');
    var hash = window.location.hash.replace(/#/, '');
    var hashArray = hash.split('+');

    var ref1, ref2;
    if (hashArray.length === 2) {
      ref1 = baseRef.child(hashArray.length - 2);
      ref2 = baseRef.child(hashArray.length - 1);
    } else {
      ref1 = baseRef.push();
      ref2 = baseRef.push();
      window.location = window.location + '#' + ref1.key() + delimiter + ref2.key(); 
    }
    if (typeof console !== 'undefined')
      console.log('Firebase data: ', ref1.toString());
      console.log('Firebase data: ', ref2.toString());
    return [ref1, ref2];
  }

  function onCommand(command, prevCommandName) {
    if (command.child('id').val() === lastCommand) {
      return;
    }

    var commandType = command.child('type').val();

    if (commandType === 'run') {
      run();
    } else if (commandType === 'stop') {
      controller.stop();
    }
  };

  function run() {
    var code = _.map(firepads, function(pad) {
      return pad.getText();
    });

    controller.run(code, logResult);
  }

  window.initEditor = init;

})();