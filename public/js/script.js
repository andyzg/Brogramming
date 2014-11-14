$(document).ready(function() {
  console.log("Document has loaded");
  var id = getParameterByName("id");

  var controller = new Controller(id);
  controller.onLoaded = function() {
    // TODO: Do whatever is needed when the map is loaded
    controller.render();
  }
});
