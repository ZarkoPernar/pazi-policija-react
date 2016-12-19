import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import AppStore from './AppStore'
// require('offline-plugin/runtime').install()

const gridCss = require('flexboxgrid')
const normalizeCss = require('normalize.css')
const appCss = require('./app.css')

render(
    <Provider store={AppStore}>    
        <App />
    </Provider>, 
    document.getElementById('app')
)
