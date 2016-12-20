let NECorner 
let NWCorner 
let SWCorner 
let SECorner 

export function getCorners(bounds) {
    NECorner = bounds.getNorthEast()
    SWCorner = bounds.getSouthWest()

    var NWCorner = new google.maps.LatLng(NECorner.lat(), SWCorner.lng())
    var SECorner = new google.maps.LatLng(SWCorner.lat(), NECorner.lng())

    return [
        [NWCorner.lng(), NWCorner.lat()], 
        [NECorner.lng(), NECorner.lat()], 
        [SECorner.lng(), SECorner.lat()], 
        [SWCorner.lng(), SWCorner.lat()], 
        [NWCorner.lng(), NWCorner.lat()]
    ]
}