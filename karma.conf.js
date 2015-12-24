var webpackConfig = require('./webpack.test.conf.js');

var browsers = process.env.CI ? ['PhantomJS'] : ['Chrome'];

module.exports = function(config) {
  config.set({
    browsers: browsers,
    files: [
      './src/**/*-test.js'
    ],
    frameworks: [ 'mocha' ],
    preprocessors: {
      './src/**/*-test.js': ['webpack'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    'plugins' : [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-webpack',
    ]
  });
};
