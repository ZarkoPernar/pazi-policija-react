
export function getDistance(p1, p2) {
  var RADIUS_M = 6378137
  var dLat = rad(p2.lat() - p1.lat())
  var dLong = rad(p2.lng() - p1.lng())
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var distanceMeters = RADIUS_M * c
  return distanceMeters // returns the distance in meters
}

function rad(x) {
  return x * Math.PI / 180
}
