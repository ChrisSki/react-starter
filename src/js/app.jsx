var jsonObj = require('./../shots.json');
var _sample = require('lodash.sample');

var colors = [
  "#FF0000",
  "#FF6363",
  "#FF3939",
  "#C50000",
  "#9B0000",
  "#FF7400",
  "#FFAA63",
  "#FF9339",
  "#C55900",
  "#9B4600",
  "#009999",
  "#46B2B2",
  "#249F9F",
  "#007676",
  "#005D5D",
  "#00CC00",
  "#54D954",
  "#2ECF2E",
  "#009E00",
  "#007C00"
];

var React = require('react');

var App = React.createClass({
  getInitialState: function () {
    return {
      shotName: null,
      shotIngredients: [],
      bg: _sample(colors)
    }
  },

  shuffle: function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  randomShot: function () {
    this.setState({
      bg: _sample(colors)
    });

    var jsonStr = JSON.stringify(jsonObj, null, 2);
    var json = JSON.parse(jsonStr);

    this.shuffle(json);
    var shotArr = json.slice(0, 50);

    $('.empty').velocity({
      tween: [49, 0]
    }, {
      duration: 3500,
      easing: "easeOutQuart",
      progress: function (elements, percentComplete, timeRemaining, timeStart, t) {
        var idx = parseInt(t);
        this.setState({
          shotName: shotArr[idx].shotName,
          shotIngredients: shotArr[idx].ingredient
        });
      }.bind(this)
    });
  },

  render: function () {

    var styles = {
      backgroundColor: this.state.bg,
      color: 'white'
    };

    var shotName = null;
    if (this.state.shotName) {
      shotName = this.state.shotName;
    } else {
      shotName = "Shot Randomizer!";
    }

    return (
      <div className="wrapper" style={styles}>
        <span className="empty"></span>
        <div className="shot-container">
          <div className="shot-name">{shotName}</div>
          <div className="ingredients">{this.state.shotIngredients}</div>
        </div>
        <div className="random-btn-container" onClick={this.randomShot}></div>
      </div>
      );
  }

});

module.exports = App;