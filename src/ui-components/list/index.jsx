var React = require('react');
var cx = require('classnames');

var styleSheet = require('./_style.scss');

var List = React.createClass({
  render () {
    return (
      <ul className={cx("list", this.props.className)}>
        <style>{styleSheet.toString()}</style>
        {this.props.children}
      </ul>
    );
  }
});

module.exports = List;