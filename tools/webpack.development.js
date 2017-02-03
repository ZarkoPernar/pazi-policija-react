var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var CONFIG = require('./config')


module.exports = {
  devtool: 'eval-source-map',
  entry: [
    CONFIG.APP_PATH + CONFIG.CLIENT_APP_PATH + CONFIG.CLIENT_ENTRY_FILE
  ],
  output: {
    path: CONFIG.CLIENT_OUTPUT_PATH,
    filename: 'bundle.js',
  },
  devServer: CONFIG.WEBPACK_DEV_SERVER_CONFIG,
  plugins: [
    new HtmlWebpackPlugin(CONFIG.HtmlWebpackPlugin),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: [
          path.resolve('app'),
          // path.resolve('node_modules/preact-compat/src'),
        ],
        exclude: ['.spec.']

      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
    ]
  }
}