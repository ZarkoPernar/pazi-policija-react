import { h, Component } from 'preact'
import { connect } from 'preact-redux'

require('./add.scss')
import GoogleAutocomplete from '../google-places/googleAutocomplete'
import autocompleteSelectActions from '../actionCreators/autocompleteSelect'
import locationService from '../common/locationsService'

class AddLocation extends Component { 
    constructor() {
        super()

        this._fuckingAdd = this._fuckingAdd.bind(this)
    }

    _fuckingAdd() {
        console.log(this.props.selectedAutocompleteItem)
        locationService.addLocation({
            description: this.descriptionEl.value,
            google_address: this.props.selectedAutocompleteItem.formatted_address,
            lat: this.props.selectedAutocompleteItem.geometry.location.lat(),
            lng: this.props.selectedAutocompleteItem.geometry.location.lng(),
        }).then((res) => {

            return res
        })
        
    }

    render({ selectedAutocompleteItem, autocompleteSelect }) {
        return (
            <div className="add-location">   
                <div className="google-autocomplete" key="autoComplete" >
                    <div className="form-group"> 
                        <GoogleAutocomplete 
                            selectedAutocompleteItem={selectedAutocompleteItem} 
                            autocompleteSelect={autocompleteSelect}/>
                    </div>                
                </div>
                
                <div className="form-group" key="description">
                    <label htmlFor="add-location-form-description"></label>
                    <input placeholder="Description" id="add-location-form-description" className="form-control" ref={el => this.descriptionEl = el} />
                </div>

                <div key="add-btn">
                    <button className="add-btn mdl-button mdl-button--raised mdl-button--colored" onClick={this._fuckingAdd}>
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