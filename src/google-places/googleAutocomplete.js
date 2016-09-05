import React from 'react'
import service from './googlePlacesService'
import mapStore from '../common/mapStore'
const scss = require('./autocomplete.scss')

class GoogleAutocomplete extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: true,
            selectedIndex: 0,
            selected: null,
            results: [],
        }

        this._autoSelect = this._autoSelect.bind(this)
    }
    componentDidMount() {
        this._autocompleteInput = new google.maps.places.Autocomplete(this._inputElement, {
            types: ['address']
        })
        this._autocompleteInput.addListener('place_changed', this._autoSelect)
    }
    _autoSelect() {
        console.log(this._autocompleteInput.getPlace())
        
        mapStore.dispatch('center_on', this._autocompleteInput.getPlace().geometry.location)

        this.setState({
            selected: this._autocompleteInput.getPlace()
        })
    }
    render() {
        return (
            <div style={{padding: '0 20px 20px 0'}} className={this.props.isOpen ? 'slide-dialog slide-dialog--open' : 'slide-dialog'}>
                <div
                    className="form-group"
                    style={{position: 'relative'}}>
                    <input ref={(e) => this._inputElement = e} style={{width: '100%'}} key="places-search" />
                </div>
            </div>
        )
    }
}

export default GoogleAutocomplete
