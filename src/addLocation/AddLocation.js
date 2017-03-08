import { createElement, Component } from 'react'

import { connect } from 'react-redux'
import { subHours, subMinutes } from 'date-fns'

import './add.scss'

import AppStore from '../AppStore'
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

        this.state = {
            showMore: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this._fuckingAdd = this._fuckingAdd.bind(this)
        this.toggleMore = this.toggleMore.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        // this._fuckingAdd()
    }

    toggleMore() {
        this.setState((state) => ({
            showMore: !state.showMore
        }))
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
        .then((res) => {
            AppStore.dispatch({type: 'SET_MODAL', payload: {value: false, name: 'newLocation'}})
        })
        
    }

    changeInc = () => {}
    changeAmount = () => {}    

    render() {
        let rotation = this.state.showMore ? 'translateY(-4px) rotate(0)' : 'translate(3px, -1px) rotate(90deg)'
        return (
            <div className="add-location">   
                <div className="google-autocomplete" key="autoComplete" >
                    <div className="form-group"> 
                        <label htmlFor="add-location-form-street">Gdje ste vidjeli</label>
                        <GoogleAutocomplete 
                            required="required"
                            id="add-location-form-street"
                            placeholder="Trazite ulicu, grad, mjesto..."
                            selectedAutocompleteItem={this.props.selectedAutocompleteItem} 
                            autocompleteSelect={this.props.autocompleteSelect}/>
                        <div className="form-control--helper" />
                    </div>                
                </div>
                
                <div className="form-group" key="description" hidden={!this.state.showMore}>
                    <label htmlFor="add-location-form-description">Sto ste vidjeli</label>
                    <input placeholder="Snimanje brzine, kamere..." type="text" id="add-location-form-description" className="form-control" ref={el => this.descriptionEl = el} />
                    <div className="form-control--helper" />
                </div>

                <div className="row" key="seen-at" hidden={!this.state.showMore}>
                    <div className="col-xs-12">
                        <label key="label" htmlFor="add-location-form-seen-at-amount">Prije koliko vremena</label>
                    </div>
                    <div key="col-1" className="col-xs-6">
                        <div className="form-group">
                            <input key="input" 
                                type="tel"
                                placeholder="createElement,m" id="add-location-form-seen-at-amount" 
                                className="form-control"
                                ref={el => {this.seenAtAmountEl = el; el.value = 0}} />
                            <div className="form-control--helper" />                        
                        </div>
                    </div>
                    <div key="col-2" className="col-xs-6">
                        <div className="form-group" key="seen-at">
                            <select key="input" id="add-location-form-seen-at-inc" className="form-control" ref={el => {this.seenAtIncEl = el; el.value = 'minutes'}}>
                                <option value="minutes">Minuta</option>
                                <option value="hours">Sati</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div key="add-btn">
                    {/*style={{marginTop: '25px'}}*/}
                    <button style={{width: '45px', minWidth: 0}} type="submit" className="add-btn btn btn--raised btn--colored" onClick={this.toggleMore}>                        
                        <span style={{transform: rotation, position: 'relative', display: 'block'}}>
                            ...
                        </span>
                    </button>
                    <button 
                        style={{width: '70%', float: 'right'}}  
                        type="submit" 
                        className="add-btn btn btn--raised btn--colored" 
                        onClick={this._fuckingAdd} 
                        disabled={!this.props.selectedAutocompleteItem}>
                        Dodaj Lokaciju
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