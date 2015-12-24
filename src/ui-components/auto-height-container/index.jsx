var debug = require('debug');
var React = require('react');
var lodash = require('lodash');

var inlineStyle = {
  position: 'fixed',
  zIndex: 9999999999999,
  top: 100,
  right: 200,
  minWidth: 200,
  minHeight: 200,
  overflowY: 'auto',
  background: '#fff',
  border: '1px solid #d9d9d9',
  borderRadius: 2,
  fontSize: 15,
};

const FONT_LIST_CONTAINER_ID = 'font-list-container';

function calcMaxHeight() {
  return window.innerHeight - inlineStyle.top * 2;
}

var AutoHeightContainer = React.createClass({
  componentWillMount() {
    inlineStyle.maxHeight = calcMaxHeight();
  },
  render() {
    return (
      <div id={FONT_LIST_CONTAINER_ID} style={lodash.clone(inlineStyle)}>{this.props.children}</div>
    );
  }
});

module.exports = AutoHeightContainer;