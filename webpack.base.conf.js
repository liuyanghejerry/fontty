var path = require('path');
var lodash = require('lodash');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var postcssCalc = require('postcss-calc');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
  cache: true,
  entry: {
    app: ['./src/index.jsx', './src/style.scss'],
    injection: ['./src/injections/index.jsx']
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  output: {
    path: './dist',
    // publicPath: "/assets/",
    filename: '[name].js',
    chunkFilename: 'chunk-[id].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html' },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      // required to write "require('./style.css')"
      { test: /\.s?css$/,    loader: 'css-loader!postcss-loader' },
      // required for bootstrap icons
      { test: /\.woff2?/,   loader: 'url-loader?limit=102400' },
      { test: /\.ttf/,    loader: 'file-loader' },
      { test: /\.eot/,    loader: 'file-loader' },
      { test: /\.svg/,    loader: 'file-loader' },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        loaders: [
          'url?limit=1024&hash=sha512&digest=hex&name=[hash].[ext]',
        ]
      },
    ]
  },
  postcss: function (webpack) {
    return [
      postcssImport({
        path: ['node_modules', './src'],
        addDependencyTo: webpack
      }),
      autoprefixer({"browsers":["Chrome >= 30", "last 2 versions", "> 10%"]}),
      precss,
      postcssCalc,
    ];
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_DIST_PATH: '"/dist/dev"',
    }),
    new ExtractTextPlugin('[name].css', {allChunks:true}),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['app'],
    }),
  ]
};
