function parseGoal(goal, player1, player2) {
  for (key in goal) {
    var location = {};
    location[row] = goal[key][0];
    location[column] = goal[key][1];
    if (key == "1") {
      player1.setGoal(location);
    } else if (key == "2") {
      player2.setGoal(location);
    }
  }
}