const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const debug = process.env.NODE_ENV !== 'production'

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

module.exports = {
  context: path.join(__dirname, "app"),
  devtool: debug ? 'inline-sourcemap' : null,
  devServer: {
    inline: true,
    contentBase: "./build",
    hot: true,
    port: 3333,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000/'
      }
    }
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass' },
    //   {
    //     test: /\.js$/,
    //     exclude: /(node_modules|bower_components)/,
    //     loader: 'babel',
    //     query: {
    //       presets: ['es2015']
    //     }
    //   },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'react-hmre'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
    ],
  },

  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
}
