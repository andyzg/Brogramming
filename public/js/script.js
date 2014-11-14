$(document).ready(function() {
  console.log("Document has loaded");
  var id = getParameterByName("id");
  var controller = new Controller(id);
  window.controller = controller;
  controller.onLoaded = function() {
    // TODO: Do whatever is needed when the map is loaded
    controller.render();
  }
});

function animate() {
  window.controller.animate();
  requestAnimFrame(animate);
}
