/* eslint-disable */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
   vendor: path.resolve(__dirname, 'src/vendor'),
   main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [

    // generate an external css with a hash
    new ExtractTextPlugin('[name].[contenthash].css'),

    // hash files using MD5 by chaging their names every time chages are made
    new webpackMd5Hash(),

    // use commonChunk to create separate bundle
    // so that they are cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // html webpack plugin refences bundled
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // properties you define here are available in index.html-error
      // using htmlWebpackPluggin options var name
      trackJsToken: "ea9f4e7df891410197a372b841a594da"
    }),

    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    // Minify js
    new webpack.optimize.UglifyJsPlugin()
  ]//,
  // module: {
  //   loaders: [
  //     {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
  //     {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
  //   ]
  // }
}