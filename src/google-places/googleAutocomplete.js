import { createElement, Component } from 'react'


import AppStore from '../AppStore'
import service from './googlePlacesService'

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
    }

    componentWillMount = () => {
        this._unregisterMap = initGoogle.addListener('map', this.initMap.bind(this))
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.selectedAutocompleteItem) {
            this._inputElement.value = nextProps.selectedAutocompleteItem.formatted_address || nextProps.selectedAutocompleteItem.formattedAddress
        } else {
            this._inputElement.value = ''
        }
    }

    componentWillUnmount = () => this._unregisterMap()
    

    addSearchRef = (el) => {
        this._inputElement = el

        if (!this._autocompleteInput && window.google && window.google.maps) {
            this.initMap()
        }
    } 

    initMap() {
        if (!this._inputElement) return
        
        this._autocompleteInput = new window.google.maps.places.Autocomplete(this._inputElement, {
            types: ['address'],
            componentRestrictions: {
                country: 'hr'
            }
        })

        this._autocompleteInput.addListener('place_changed', this._autoSelect)
    }

    _autoSelect = (e) => {
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
        let {selectedAutocompleteItem, autocompleteSelect, ...props} = this.props
        return <input type="text" {...props} className="form-control google-autocomplete-input" ref={this.addSearchRef} />        
    }
}

export default GoogleAutocomplete
