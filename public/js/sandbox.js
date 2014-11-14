(function() {
  var log = '';
  console.log = appendToLog;
  alert = appendToLog;

  window.addEventListener('message', function (e) {
    var mainWindow = e.source;
    log = '';
    try {
      eval(e.data);
    } catch (e) {
      appendToLog(e);
    }
    mainWindow.postMessage(log, event.origin);
  });

  function appendToLog(message) {
    log += message + '\n';
  }



})();