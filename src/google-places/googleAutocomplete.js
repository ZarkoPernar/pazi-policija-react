import { Component, h } from 'preact'

import AppStore from '../AppStore'
import service from './googlePlacesService'
import mapStore from '../common/mapStore'
import locationService from '../common/locationsService'
const scss = require('./autocomplete.scss')



const initMap = window.initMap


class GoogleAutocomplete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: true,
            selectedIndex: 0,
            selected: null,
            results: [],
        }
        this._autoSelectPlace = null
        
        this.addSearchRef = this.addSearchRef.bind(this)        
        this.addDescrRef = this.addDescrRef.bind(this)        

        this._autoSelect = this._autoSelect.bind(this)
        this._fuckingAdd = this._fuckingAdd.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)

        mapStore.subscribe('google_map_selected', (place) => {   
            this._inputElement.value = place.formattedAddress            
        })
    }
    addSearchRef(el) {
        this._inputElement = el

        if (!this._autocompleteInput && window.google && window.google.maps) {
            this.initMap()
        }
    }
    addDescrRef(el) {
        this._descrElement = el
    }    

    componentWillMount() {
        this._unregisterMap = initMap.addListener(this.initMap.bind(this))
    }

    componentWillUnmount() {
        this._unregisterMap()
    }

    initMap() {
        if (!this._inputElement) return
        
        this._autocompleteInput = new window.google.maps.places.Autocomplete(this._inputElement, {
            types: ['address']
        })
        this._autocompleteInput.addListener('place_changed', this._autoSelect)
    }
    _autoSelect() {
        this._autoSelectPlace = this._autocompleteInput.getPlace()

        if (typeof this._autoSelectPlace !== 'object') {
            return
        } 

        this.props.autocompleteSelect(
            this._autocompleteInput.getPlace()
        )

        // mapStore.dispatch('google_autocomplete_selected', this._autocompleteInput.getPlace())

        this.setState({
            selected: this._autocompleteInput.getPlace()
        })
    }

    _fuckingAdd() {
        let pos = this._autocompleteInput.getPlace().geometry.location
        let address = this._autocompleteInput.getPlace()

        locationService.addLocation({
            description: this._descrElement.value,
            google_address: address.formatted_address,
            lat: pos.lat(),
            lng: pos.lng(),
        }).then((res) => {
            console.log(res)
            AppStore.dispatch({
                type: 'ADD_ITEM',
                payload: res
            })
        })
        
    }

    render() {
        return (
            <div className={this.props.isOpen ? 'slide-dialog slide-dialog--open' : 'slide-dialog'}>
                <div key="inputAddress"
                    className="form-group"
                    style={{position: 'relative'}}>
                    <input type="text" ref={this.addSearchRef} style={{width: '100%'}} key="places-search" />
                </div>
                <div key="inputDescription"
                    className="form-group"
                    style={{position: 'relative'}}>
                    <input ref={this.addDescrRef} style={{width: '100%'}} key="places-search" />
                </div>
                <button key="add" onClick={this._fuckingAdd}>Add</button>
            </div>
        )
    }
}

export default GoogleAutocomplete
