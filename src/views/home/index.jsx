var React = require('react');
var debug = require('debug');

var styleSheet = require('./_style.scss').toString();


var distPath = BUILD_DIST_PATH;

var List = require('../../ui-components/list');

var Home = React.createClass({
  listFonts() {
    new Promise((resolve, reject) => {
      chrome.tabs.getSelected(null, resolve);
    })
    .then((tab) => {
      chrome.tabs.executeScript({
        file: `${distPath}/injection.js`
       });
    })
  },
  render () {
    return (
      <div className="home">
        <style>{styleSheet}</style>
        <List>
          <li onClick={this.listFonts} style={{
            minWidth: 200
          }}>
            {chrome.i18n.getMessage("LIST_ALL_FONTS")}
          </li>
        </List>
      </div>
    );
  }
});
module.exports = Home;
