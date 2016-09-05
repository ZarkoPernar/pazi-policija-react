let subscribers = {}

const mapStore = {
    dispatch(name, data) {
        if (subscribers[name]) {
            subscribers[name].forEach(cb => cb(data))
        }
    },
    subscribe(name, cb) {
        if (!subscribers[name]) {
            subscribers[name] = []
        }
        subscribers[name].push(cb)
    }
}

export default mapStore
