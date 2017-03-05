import { createElement, Component } from 'react'


export default class CenterMap extends Component {
    constructor() {
        super()
    }

    componentDidUpdate(prevProps) {
        if (this.props.center !== prevProps.center) {
            if (this.props.map) {
                this.props.map.setCenter({
                    lat: this.props.center.lat, 
                    lng: this.props.center.lng
                })
            }
        } 
    }

    render() {
        return null
    }
}