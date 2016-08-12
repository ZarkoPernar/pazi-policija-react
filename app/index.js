import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'

const gridCss = require('flexboxgrid')
const normalizeCss = require('normalize.css')
const appCss = require('./app.css')

ReactDOM.render(React.createElement(App), document.getElementById('app'))