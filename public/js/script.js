$(document).ready(function() {
  console.log("Document has loaded");
  var id = getParameterByName("id");
  var map = new Map(id);
  map.onLoaded = function() {
    // TODO: Do whatever is needed when the map is loaded
    console.log("Hello");
  }
});
