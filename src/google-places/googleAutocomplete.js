import { Component, h } from 'preact'

import AppStore from '../AppStore'
import service from './googlePlacesService'
import mapStore from '../common/mapStore'

const scss = require('./autocomplete.scss')

const initGoogle = window.initGoogle

class GoogleAutocomplete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: null,
            results: [],
        }
        this._autoSelectPlace = null
        
        this.addSearchRef = this.addSearchRef.bind(this)        
        this._autoSelect = this._autoSelect.bind(this)
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

    componentWillMount() {
        this._unregisterMap = initGoogle.addListener('map', this.initMap.bind(this))
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

        this.setState({
            selected: this._autocompleteInput.getPlace()
        })
    }

    render() {
        return <input type="text" className="form-control google-autocomplete-input" ref={this.addSearchRef} />        
    }
}

export default GoogleAutocomplete
