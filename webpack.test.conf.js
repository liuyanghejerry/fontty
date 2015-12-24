var webpackConfig = require('./webpack.dev.conf.js');
webpackConfig.entry = {};
webpackConfig.plugins.splice(4, 1);
module.exports = webpackConfig;
