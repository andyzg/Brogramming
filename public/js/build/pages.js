/** @jsx React.DOM */
var Container = React.createClass({displayName: 'Container',
  render: function() {
    var rows = [];
    for (var i=0; i < 3; i++) {
      // The levels aren't zero indexed
      rows.push(
        React.createElement(Row, {start: i*3+1, end: i*3+4})
      );
    }
    return (
      React.createElement("div", null, rows)
    );
  }
});

var Row = React.createClass({displayName: 'Row',
  render: function() {
    var row = [];
    for (var i = this.props.start; i < this.props.end; i++) {
      row.push(
        React.createElement(Level, {id: i})
      );
    }
    return (
      React.createElement("div", null, row)
    );
  }
});

var Level = React.createClass({displayName: 'Level',
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

    var url = "/game?id=" + this.state.id;
    return (
      React.createElement("div", {className: "level", style: style}, 
        React.createElement("a", {href: url}, 
          React.createElement("span", null, "Level ", this.props.id)
        )
      )
    );
  }
});

React.render(React.createElement(Container, null), document.getElementById("levels"));
console.log("Loaded pages.js");
