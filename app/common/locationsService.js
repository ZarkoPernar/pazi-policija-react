
const service = {
	/**
	 * listAll	returns all locations
	 * @return {[location]}
	 */
	listAll() {
		return fetch('/api/locations', {
			method: 'POST',
			body: JSON.stringify({})
		})
	}
}

module.exports = service