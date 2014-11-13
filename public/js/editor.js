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

  window.onload = init;
})();