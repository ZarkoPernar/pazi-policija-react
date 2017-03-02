import { h, render } from 'preact'
import { Provider } from 'preact-redux'

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production') {
	require('offline-plugin/runtime').install()
}

require('flexboxgrid')
require('normalize.css')
require('./app.css')

let root

function init() {
	let App = require('./App').default
	root = render(<App />, document.body, root)
}

// in development, set up HMR:
if (module.hot) {
	require('preact/devtools')
	module.hot.accept()
	module.hot.accept(root, () => requestAnimationFrame(init) )
}

init()
