var expect = require('expect.js');
var fontFinder = require('./');

describe('font-finder', function() {
  var allTestElements = null;
  beforeEach(function() {
    '12345'.split('').map(function() {
      var span = document.createElement('span');
      span.classList.add('test-font-finder');
      document.body.insertBefore(span, null);
    });
    allTestElements = Array.prototype.slice.call(document.querySelectorAll('.test-font-finder'));
  });

  it('should get all text nodes', function() {
    var results = fontFinder.getTextNodes(allTestElements);
    expect(results).to.be.a(Array);
  });

  it('should get all node fonts', function() {
    var results = fontFinder.getTextNodes(allTestElements);
    var result = fontFinder.getElementFont(results[0]);
    expect(result.element).to.be.a(Object);
    expect(result.font).to.be.a('string');
  });

  it('should get an unified font list', function() {
    var results = (fontFinder.getTextNodes(allTestElements)).map(fontFinder.getElementFont);
    results = fontFinder.unifyFontList(results);
    expect(results).to.be.a(Object);
    expect(Object.keys(results).length > 0).to.be.ok();
  });
});