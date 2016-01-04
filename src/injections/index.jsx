require('debug').enable('fontty:*');
var debug = require('debug');
var React = require('react');
var ReactDOM = require('react-dom');

var lodash = require('lodash');
var FaClose = require('react-icons/lib/fa/close');

var AutoHeightContainer = require('../ui-components/auto-height-container');
var List = require('../ui-components/list');
var FontListItem = require('../ui-components/font-list-item');
var styleSheet = require('./_style.scss');

var {getTextNodes, getElementFont, unifyFontList} = require('../font-finder');

var ColorMaker = require('../color-maker').ColorMaker;
var colorMaker = new ColorMaker();

const FONTTY_CONTAINER_ID = 'fontty-container';
const FONT_LIST_CONTAINER_ID = 'font-list-container';

var App = React.createClass({
  getInitialState() {
    return {
      unifiedFontList: []
    };
  },
  componentDidMount() {
    var nodes = Array.from((() => {
      return document.querySelectorAll('*');
    })());
    var textNodes = getTextNodes(nodes);
    var unifiedFontList = unifyFontList(textNodes.map(getElementFont));
    this.setState({
      unifiedFontList: unifiedFontList
    });

    this.bindEvents();
  },
  componentWillUnmount() {
    this.unbindEvents();
  },
  render() {
    var unifiedFontList = lodash.clone(this.state.unifiedFontList);
    var list = Object.keys(unifiedFontList).map((font) => {
      return (<FontListItem
                key={font}
                color={colorMaker.genColor()}
                elements={unifiedFontList[font]}
                font={font}>
                  {font}
              </FontListItem>);
    });
    return (
      <AutoHeightContainer>
        <List className="font-list">
          <div className="font-list-header">
            <span className="control" ref="close-btn"><FaClose /></span>
          </div>
          {list}
        </List>
      </AutoHeightContainer>
    );
  },
  bindEvents() {
    if(!this.refs['close-btn']) {
      debug('cannot find close-btn');
      return;
    }

    this.refs['close-btn'].addEventListener('click', uninstall);
  },
  unbindEvents() {
    if(!this.refs['close-btn']) {
      debug('cannot find close-btn');
      return;
    }

    this.refs['close-btn'].removeEventListener('click', uninstall);
  }
});


function install() {
  var target = document.getElementById(FONTTY_CONTAINER_ID);
  if(target) {
    return;
  }

  // create container for shadow dom
  target = document.createElement('div');
  target.id = FONTTY_CONTAINER_ID;
  document.body.insertBefore(target, null);
  // make a real shadow root
  var root = target.createShadowRoot();
  // insert styles for our widget
  var styleNode = document.createElement('style');
  styleNode.innerHTML = styleSheet.toString();
  root.insertBefore(styleNode, null);
  // create container for the real widget
  var container = document.createElement('div');
  container.id = FONT_LIST_CONTAINER_ID;
  root.insertBefore(container, null);
  // party time!
  ReactDOM.render(<App />, container);
}

function uninstall() {
  var target = document.getElementById(FONTTY_CONTAINER_ID);
  var container = target.shadowRoot.getElementById(FONT_LIST_CONTAINER_ID);
  ReactDOM.unmountComponentAtNode(container);
  target.parentElement.removeChild(target);
}

install();