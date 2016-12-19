var path = require('path')
var webpack = require('webpack')
var OfflinePlugin = require('offline-plugin')

module.exports = {
  // devtool: 'cheap-module-source-map',
  devtool: 'eval',
  entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: 'http://localhost:3000/static/'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    
    // -- PRODUCTION --
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // new OfflinePlugin({
    //   caches: 'all',
    //   externals: ['./index.html']
    // }),
  ],
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: [
          path.resolve('src'),
          path.resolve('node_modules/preact-compat/src')
        ]

      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      }
    ]
  }
}