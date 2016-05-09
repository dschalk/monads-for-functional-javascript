module.exports = {
  context: "/mnt/B/StackZone/NPM/JS-monads-stable/client/src",
  entry: "./main.js",
  output: {
      path: "/mnt/B/StackZone/NPM/JS-monads-stable/client/dist",
      filename: "main.js"
  },
  module: {
    loaders: [
        {
            test:   /\.js/,
            loader: 'babel',
            include: "/mnt/B/StackZone/js-monads/",
        }
    ],
    query: {
      plugins: ['transform-runtime'],
      presets: ['es2015', 'stage-0'],
    }
  }
}

