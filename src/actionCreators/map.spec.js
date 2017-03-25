import types from '../types/map'
import { getCenterFromGeoposition } from './map'

describe('map action creators', () => {

    describe('getCenterFromGeoposition action creator', () => {

        test('should exist', () => {
            expect(getCenterFromGeoposition).toBeDefined()
        })

        test('should return an action object', () => {
            let geopositionResult = {
                coords: {
                    longitude: 14.312,
                    latitude: 14.312,
                }
            }
            let expectedResult = {
                type: types.CENTER_ON_ME,
                payload: {
                    center: {
                        lat: 14.312,
                        lng: 14.312,
                    }
                }
            }
            let actualResult = getCenterFromGeoposition(geopositionResult)

            expect(expectedResult).toEqual(actualResult)
        })



    })

})
