var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var CONFIG = require('./config')


module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    CONFIG.APP_PATH + CONFIG.CLIENT_ENTRY_FILE
  ],
  output: {
    path: '/' + CONFIG.CLIENT_OUTPUT_PATH,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js'],
    // alias: {
    //   'react': 'preact-compat',
    //   'react-dom': 'preact-compat',
    // },
  },
  devServer: CONFIG.WEBPACK_DEV_SERVER_CONFIG,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin(CONFIG.HtmlWebpackPlugin),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('styles.css'),
  ],
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: [
          path.resolve('src'),
          // path.resolve('node_modules/preact-compat/src'),
        ],
        exclude: ['.spec.']

      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader!sass-loader'
        })
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader',
            'image-webpack-loader'
        ]
      },
    ]
  }
}