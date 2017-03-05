import { h } from 'preact'
import { PureComponent } from 'preact-compat'

import { getGeolocationFromLocalstorage } from './common/geoLocation'

export default class GeoLocation extends PureComponent {
    constructor(props) {
        super(props)
        
        let localGeo = getGeolocationFromLocalstorage()

        if (localGeo) {
            this.props.centerOn(localGeo)
        }
    }
}