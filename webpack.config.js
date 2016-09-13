"use strict";

module.exports = {
  context: __dirname,
  entry: "./lib/main.js",
  output: {
    path: "./lib",
    filename: "my_jquery.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", '.jsx']
  }
};
