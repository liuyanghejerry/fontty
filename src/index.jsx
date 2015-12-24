require('debug').enable('fontty:*');
var debug = require('debug');
var React = require('react');
var ReactDOM = require('react-dom');

var Home = require('./views/home');

var App = React.createClass({
  render () {
    return (<Home/>);
  }
});

var styleNode = document.createElement('style');
styleNode.innerHTML = require('./style.scss').toString();
document.body.insertBefore(styleNode, null);

ReactDOM.render(
  (<App/>), 
  document.querySelector('#container')
);
