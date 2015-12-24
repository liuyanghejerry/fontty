var React = require('react');
var lodash = require('lodash');

var FontListItem = React.createClass({
  componentDidMount() {
    var color = lodash.clone(this.props.color);
    this.props.elements.forEach((elm) => {
      elm.element.style['background-color'] = color;
    });
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
        }}
        onMouseOver={this.props.onHover}>
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