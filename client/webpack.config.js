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
            loader: "babel-loader"
        }
    ],
    query: {
      plugins: ["transform-decorators-legacy"],
      presets: ['es2015', 'stage-0']
    }
  }
}
