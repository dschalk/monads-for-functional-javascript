var path = require('path');

module.exports = {
  context: __dirname + "/",
  entry: "./main.js",
  output: {
      path: __dirname + "/dist",
      filename: "bundle.js",
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.elm$/,
      loaders: ['elm-simple-loader'],
      exclude: /node_modules/
    }
    ],
    query: {
      presets: ['es2015']
    }
  }
}
