function ColorMaker() {
  this.hueRanges = [[0, 360]];
}

ColorMaker.prototype.genColor = function() {
  return `hsla(${this._genHue()}, ${_getRandomInt(40, 80)}%, ${_getRandomInt(30, 80)}%, .8)`;
};

ColorMaker.prototype._genHue = function() {
  var range = this.hueRanges[0]; 
  var midPoint = (range[1] - range[0]) / 2 + range[0];
  var leftRange = [range[0], midPoint];
  var rightRange = [midPoint, range[1]];
  this.hueRanges.shift();
  this.hueRanges.push(leftRange, rightRange);
  return midPoint;
};

function _getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.ColorMaker = ColorMaker;