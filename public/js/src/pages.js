/** @jsx React.DOM */
var Container = React.createClass({
  render: function() {
    var rows = [];
    for (var i=0; i < 3; i++) {
      // The levels aren't zero indexed
      rows.push(
        <Row start={i*3+1} end={i*3+4} />
      );
    }
    return (
      <div>{rows}</div>
    );
  }
});

var Row = React.createClass({
  render: function() {
    var row = [];
    for (var i = this.props.start; i < this.props.end; i++) {
      row.push(
        <Level id={i} />
      );
    }
    return (
      <div>{row}</div>
    );
  }
});

var Level = React.createClass({
  getInitialState: function() {
    return {
      id: "",
      difficulty: 1,
    }
  },
  componentDidMount: function() {
    $.get("/map/" + this.props.id, function(data) {
      this.state.id = data.id;
      this.state.difficulty = data.difficulty;
      console.log(this.state.difficulty);
      this.forceUpdate();
    }.bind(this));
  },
  render: function() {
    console.log(this.state.id, this.state.difficulty);
    var color;
    console.log(this.state.difficulty);
    switch(this.state.difficulty) {
      case 2:
        color = "#FFBB33";
        break;
      case 3:
        color = "#FF4444";
        break;
      case 1:
      default:
        color = "#99CC00";
    }

    var style = {
      backgroundColor: color,
    };

    return (
      <div className="level" style={style}>
        <span>Level {this.props.id}</span>
      </div>
    );
  }
});

React.render(<Container />, document.getElementById("levels"));
console.log("Loaded pages.js");
