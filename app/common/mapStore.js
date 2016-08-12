let subscribers = []

const mapStore = {
	dispatch(data) {
		subscribers.forEach(cb => cb(data))
	},
	subscribe(cb) {
		subscribers.push(cb)
	}
}

export default mapStore