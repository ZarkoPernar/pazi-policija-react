var path = require('path')
var webpack = require('webpack')
var OfflinePlugin = require('offline-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle-[hash].js',
    publicPath: 'http://localhost:3000/',
  },
  devServer: {
    port: process.env.PORT || 8080,
		host: 'localhost',
		colors: true,
		publicPath: 'http://localhost:8080/',
		contentBase: './public',
		historyApiFallback: true,
		open: true,

    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  plugins: [
    new OfflinePlugin({
      caches: 'all',
      externals: ['./index.html']
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: [
          path.resolve('src'),
          path.resolve('node_modules/preact-compat/src'),
        ],
        exclude: ['.spec.']

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