var expect = require('expect.js');
var ColorMaker = require('./').ColorMaker;

describe('ColorMaker', function() {

  it('should export a function', function() {
    expect(ColorMaker).to.be.a('function');
  });

  it('should generate a color', function() {
    var colorMaker = new ColorMaker();
    expect(colorMaker.genColor()).to.contain('hsl');
  });

  it('should generate different colors when called multiple times', function() {
    var colorMaker = new ColorMaker();
    var color1 = colorMaker.genColor();
    var color2 = colorMaker.genColor();
    expect(color1 !== color2).to.be(true);
  });
});