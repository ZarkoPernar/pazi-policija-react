import { h, render } from 'preact'
import { Provider } from 'preact-redux'

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production') {
	require('offline-plugin/runtime').install()
}

require('preact/devtools')

const gridCss = require('flexboxgrid')
const normalizeCss = require('normalize.css')
const appCss = require('./app.css')

let root

function init() {
	let App = require('./App').default
	root = render(<App />, document.body, root)
}

init()

// in development, set up HMR:
if (module.hot) {
	module.hot.accept('./App', () => requestAnimationFrame(init) )
}
