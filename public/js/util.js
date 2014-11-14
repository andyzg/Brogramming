/**
 * Gets query parameters by name
 * @param {string} name - Name of the query parameter
 * @return {string} result - Value of the query parameter
 */
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * A helper assert function
 * @param {bool} condition - Condition to check
 * @param {string} message - An optional message to show
 */
function assert(condition, message) {
  if (!condition) {
    throw message || "Assertion failed";
  }
}

/**
 * A helper function to create a 2D array
 * @param {int} row - Number of rows
 * @param {int} column - Number of columns
 * @return {array} arr - A 2D array
 */
function new2DArray(row, column) {
  var arr = new Array(row);
  for (var i = 0; i < row; i++) {
    arr[i] = new Array(column);
  }
  return arr;
}
