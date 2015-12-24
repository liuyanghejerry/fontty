var conf = require('./webpack.base.conf.js');

conf.output.path = 'dist/dev';

conf.cache = true;
conf.devtool = 'cheap-module-source-map';

module.exports = conf;
