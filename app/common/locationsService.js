const service = {
	/**
	 * listAll	returns all locations
	 * @return {[location]}
	 */
	listAll() {
		return fetch('/api/locations', {
			method: 'POST',
			body: JSON.stringify({
				lat: 45.78667904136372,
				lng: 15.9796142578125,
			})
		})
	}
}

module.exports = service