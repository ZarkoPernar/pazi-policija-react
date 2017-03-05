import { createElement, Component } from 'react'
import { PureComponent } from 'react'

import { getGeolocationFromLocalstorage } from './common/geoLocation'

export default class GeoLocation extends PureComponent {
    constructor(props) {
        super(props)
        
        let localGeo = getGeolocationFromLocalstorage()

        if (localGeo) {
            this.props.centerOn(localGeo)
        }
    }

    render() {
        return null
    }
}