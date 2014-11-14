(function() {

  function init() {
    // Initialize Firebase.
    var firepadRef = getRandomRef();
    // Create ACE
    var editor = ace.edit("firepad-container");
    editor.setTheme("ace/theme/textmate");
    var session = editor.getSession();
    session.setUseWrapMode(true);
    session.setUseWorker(false);
    session.setMode("ace/mode/javascript");

    // Create Firepad.
    var firepad = Firepad.fromACE(firepadRef, editor, {
      defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
    });

    var commandsRef = firepadRef.child('history');
    commandsRef.on('child_added', onCommand);

    document.getElementById('evaluate').addEventListener('click', function () {
      var code = firepad.getText();
      evaluate(code);
    });
  }

  // Helper to get hash from end of URL or generate a random one.
  function getRandomRef() {
    var ref = new Firebase('https://brogramming.firebaseio.com');
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = window.location + '#' + ref.key(); // add it as a hash to the URL.
    }
    if (typeof console !== 'undefined')
      console.log('Firebase data: ', ref.toString());
    return ref;
  }

  function onCommand(command, prevCommandName) {
    console.log(command.child('a').val());
  }

  function evaluate(code) {
    //var sandbox = document.getElementById('sandbox');
    //sandbox.contentWindow.postMessage(code, '*');
    var worker = new Worker('js/userCodeWorker.js');
    worker.addEventListener("message", function(e) {
      if (e.data.type === 'log') {
        logResult(e.data.value);
      } else if (e.data.type === 'next') {
        if (!e.data.value.done) {
          logResult(e.data.value.value);
          worker.postMessage({type: 'next'});
        }
      }
    });
    worker.postMessage({type: 'begin', value: code});
    worker.postMessage({type: 'next'});
  }

  function logResult(message) {
    var console = document.getElementById('console');
    console.value += message + '\n';
  }

  window.onload = init; // TODO change

})();