import { createElement, Component } from 'react'
import { render } from 'react-dom'

// if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production') {
// 	require('offline-plugin/runtime').install()
// }
if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development') {
	// require('react-dom/devtools')
}

require('flexboxgrid')
require('normalize.css')
require('./app.css')

let root

function init() {
	let App = require('./App').default	
	root = render(<App />, document.getElementById('app'), root)
}

// in development, set up HMR:
if (module.hot) {
	module.hot.accept()
	module.hot.accept(root, () => requestAnimationFrame(init) )
}

init()
