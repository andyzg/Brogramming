var Map = function(id) {
  if (!id) {
    console.error("ERROR: No id given");
    return;
  }

  var path = "/map?id=" + id;
  console.log("ID is " + id + ", file name is " + path);
  $.get(path, function(data) {
    console.log(data);
  });
}
