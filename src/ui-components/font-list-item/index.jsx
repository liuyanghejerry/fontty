var React = require('react');
var lodash = require('lodash');
var xpath = require('xpath-dom');

var FontListItem = React.createClass({
  componentDidMount() {
    this.domIds = {};
    var color = lodash.clone(this.props.color);
    this.props.elements.forEach((elm) => {
      var domId = xpath.getUniqueXPath(elm.element, document);
      this.domIds[domId] = elm.element.style['background-color'];
      elm.element.style['background-color'] = color;
    });
  },
  componentWillUnmount() {
    this.restoreBg();
  },
  restoreBg() {
    this.props.elements.forEach((elm) => {
      var domId = xpath.getUniqueXPath(elm.element, document);
      var bgColor = this.domIds[domId];
      if(bgColor === undefined) {
        return;
      }
      elm.element.style['background-color'] = bgColor;
    });
    this.domIds = {};
  },
  render() {
    var color = lodash.clone(this.props.color);

    return (
      <li 
        className="font-list-item" 
        style={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'auto',
        }}>
        <span 
          className="font-color" 
          style={{
            display: 'inline-block',
            flexGrow: 0,
            flexShrink: 0,
            width: 20,
            height: 20,
            marginRight: '1em',
            backgroundColor: color
          }}></span>
        <span 
          style={{
            display: 'inline-block',
            flexGrow: 1,
            flexShrink: 0,
            height: 20,
            maxWidth: 160,
            lineHeight: '20px',
            fontFamily: this.props.font,
            overflowX: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          className="font-name">{this.props.font}</span>
      </li>
    );
  }
});

module.exports = FontListItem;