export const RADIUS_KM = 6378.8
export const RADIUS_MI = 3963.0  
export const RADIUS = RADIUS_KM
export const USING_RADIUS = 'KM'

export function getRadius(map) {
    const RADIAN = 57.2958
    
    var bounds = map.getBounds()

    var center = bounds.getCenter()
    var ne = bounds.getNorthEast()    

    // Convert lat or lng from decimal degrees into radians (divide by RADIAN)
    var lat1 = center.lat() / RADIAN
    var lon1 = center.lng() / RADIAN
    var lat2 = ne.lat() / RADIAN
    var lon2 = ne.lng() / RADIAN

    // distance = circle radius from center to Northeast corner of bounds
    var dis = RADIUS * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1))

    return dis
}
