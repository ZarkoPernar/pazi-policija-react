module.exports = {
    APP_PATH: './app/',
    CLIENT_APP_PATH: 'client/',
    SERVER_APP_PATH: 'server/',

    CLIENT_ENTRY_FILE: 'app.js',
    CLIENT_OUTPUT_PATH: 'public/',

    HtmlWebpackPlugin: {
        title: 'Pazi, Policija',
        template: './src/index.html'
    },

    WEBPACK_DEV_SERVER_CONFIG: {
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
}
