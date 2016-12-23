var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    './src'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/',
  },
  devServer: {
    port: process.env.PORT || 8080,
		host: 'localhost',
		colors: true,
		publicPath: 'http://localhost:8080/',
		contentBase: './dist',
		historyApiFallback: true,
		open: true,

    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
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