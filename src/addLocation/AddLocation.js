import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { subHours, subMinutes } from 'date-fns'

require('./add.scss')
import GoogleAutocomplete from '../google-places/googleAutocomplete'
import autocompleteSelectActions from '../actionCreators/autocompleteSelect'
import locationService from '../common/locationsService'

const getDate = (inc, amount) => {
    if (inc === 'minutes') {
        subMinutes(new Date(), amount)
    } else {
        subHours(new Date(), amount)
    }
}

class AddLocation extends Component { 
    constructor() {
        super()

        this.handleSubmit = this.handleSubmit.bind(this)
        this._fuckingAdd = this._fuckingAdd.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        // this._fuckingAdd()
    }

    _fuckingAdd() {
        if (!this.props.selectedAutocompleteItem) return

        let amount = parseInt(this.seenAtAmountEl)
        let inc = this.seenAtIncEl
        let seenAt = amount ? getDate(inc, amount) : undefined

        locationService.addLocation({
            description: this.descriptionEl.value,
            google_address: this.props.selectedAutocompleteItem.formatted_address || this.props.selectedAutocompleteItem.formattedAddress,
            lat: this.props.selectedAutocompleteItem.geometry.location.lat(),
            lng: this.props.selectedAutocompleteItem.geometry.location.lng(),
            seen_at: seenAt,
        })
        
    }
    

    render({ selectedAutocompleteItem, autocompleteSelect }) {
        return (
            <div className="add-location">   
                <div className="google-autocomplete" key="autoComplete" >
                    <div className="form-group"> 
                        <label htmlFor="add-location-form-street">Gdje ste vidjeli</label>
                        <GoogleAutocomplete 
                            required="required"
                            id="add-location-form-street"
                            placeholder="Trazite ulicu, grad, mjesto..."
                            selectedAutocompleteItem={selectedAutocompleteItem} 
                            autocompleteSelect={autocompleteSelect}/>
                    </div>                
                </div>
                
                <div className="form-group" key="description">
                    <label htmlFor="add-location-form-description">Sto ste vidjeli</label>
                    <input type="text" id="add-location-form-description" className="form-control" ref={el => this.descriptionEl = el} />
                </div>

                <div className="row" key="seen-at">
                    <div className="col-xs-12">
                        <label key="label" htmlFor="add-location-form-seen-at-amount">Prije koliko vremena</label>
                    </div>
                    <div key="col-1" className="col-xs-6">
                        <div className="form-group">
                            <input key="input" 
                                type="tel"
                                placeholder="h,m" id="add-location-form-seen-at-amount" 
                                className="form-control"
                                value="0" 
                                ref={el => this.seenAtAmountEl = el} />
                        </div>
                    </div>
                    <div key="col-2" className="col-xs-6">
                        <div className="form-group" key="seen-at">
                            <select key="input" id="add-location-form-seen-at-inc" className="form-control" value="minutes" ref={el => this.seenAtIncEl = el}>
                                <option value="minutes">Minuta</option>
                                <option value="hours">Sati</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div key="add-btn">
                    <button type="submit" className="add-btn mdl-button mdl-button--raised mdl-button--colored" onClick={this._fuckingAdd}>
                        Add
                    </button>
                </div>                
            </div>
        )
    }
}

const LinkedAddLocation = connect(mapStateToProps, mapDispatchToProps)(AddLocation)

export default LinkedAddLocation

function mapStateToProps({activeView, searchParams, selectedAutocompleteItem}) {
    return { 
        activeView,
        searchParams,
        selectedAutocompleteItem,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autocompleteSelect: (item) => {
            dispatch(
                autocompleteSelectActions.select(
                    item
                )
            )
        },
        onSearchKeydown: (event) => {
            dispatch({
                type: 'SEARCH_KEYDOWN',
                payload: {
                    inputValue: event.target.value
                }
            })
        },
        onSearchEnter: (event) => {
            dispatch({
                type: 'SEARCH_ENTER',
                payload: {
                    inputValue: event.target.value
                }
            })
        },
    }
}