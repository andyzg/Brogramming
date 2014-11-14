$(document).ready(function() {
  console.log("Document has loaded");
  var id = getParameterByName("id");
  var controller = new Controller(id, function() {
    setTimeout(function() {
      controller.render();
    }, 500);
  });
  window.controller = controller;
});

function animate() {
  window.controller.animate();
  requestAnimFrame(animate);
}
