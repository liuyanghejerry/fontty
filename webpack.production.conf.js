var webpack = require("webpack");
var path = require('path');
var conf = require('./webpack.base.conf.js');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var postcssCalc = require('postcss-calc');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

conf.plugins = [
  new webpack.DefinePlugin({
    BUILD_DIST_PATH: '"/dist/production"',
  }),
  new ExtractTextPlugin('[name].css', {allChunks:true}),
  new webpack.optimize.OccurenceOrderPlugin(true),
  new HtmlWebpackPlugin({
    inject: true,
    template: 'src/index.html',
    filename: 'index.html',
    chunks: ['app'],
  }),
];

conf.output = {
  path: 'dist/production',
  filename: '[name].js',
  chunkFilename: 'chunk-[chunkhash].js'
};
conf.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    comments: /liuyanghejerry/
  })
);

module.exports = conf;
