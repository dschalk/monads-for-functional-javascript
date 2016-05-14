var path = require('path');

module.exports = {
  context: __dirname + "/src",
  entry: "./main.js",
  output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
  },
  module: {
    loaders: [
        {
            test:   /\.js/,
            loader: "babel?presets[]=stage-0",
        }
    ],
    query: {
      presets: ['es2015', 'stage-0'],
    }
  }
}


