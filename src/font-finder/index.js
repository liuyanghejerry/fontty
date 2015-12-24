var lodash = require('lodash');

var isDeepestNode = (elm) => {
  return elm.childElementCount === 0;
};
var isContainTextNode = (elm) => {
  return Array.from(elm.childNodes).filter((elm) => {
    return elm.nodeType === Node.TEXT_NODE && elm.nodeValue.trim().length > 0;
  }).length > 0;
};
var isSelectNode = (elm) => {
  return elm.tagName.toLowerCase() === 'select';
};
var isNonTextTag = (elm) => {
  return ['canvas', 'img', 'video', 'audio', 'script', 'style', 'link', 'meta', 'head'].indexOf(elm.tagName.toLowerCase()) < 0;
};
var isFontAwesome = (elm) => {
  return Array.from(elm.classList).indexOf('fa') >= 0;
};

export function getTextNodes(elmArray) {
  return elmArray.filter((elm) => {
    return (isDeepestNode(elm) || isContainTextNode(elm) || isSelectNode(elm)) 
          && isNonTextTag(elm) 
          && !isFontAwesome(elm);
  });
}

export function getElementFont(elm) {
  return {
    element: elm, 
    font: window.getComputedStyle(elm, null).getPropertyValue('font-family')
  };
}

export function unifyFontList(items) {
  var groupedItems = lodash.groupBy(items, (item) => {
    return item.font;
  });

  return groupedItems;
}
