var path = require('path')
var webpack = require('webpack')
var OfflinePlugin = require('offline-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var CONFIG = require('./config')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    CONFIG.APP_PATH + CONFIG.CLIENT_ENTRY_FILE
  ],
  output: {
    path: CONFIG.CLIENT_OUTPUT_PATH,
    filename: 'bundle-[chunkhash].js',
  },
  devServer: CONFIG.WEBPACK_DEV_SERVER_CONFIG,
  plugins: [
    new ExtractTextPlugin('styles.[chunkhash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2,
    }),
    new HtmlWebpackPlugin(Object.assign({}, CONFIG.HtmlWebpackPlugin, {
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        // removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    })),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // new OfflinePlugin({
    //   caches: 'all',
    //   externals: ['./index.html']
    // }),
  ],
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
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader'
        })
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
    ]
  }
}