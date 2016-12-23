import { Component, h } from 'preact'
import { connect } from 'preact-redux'

import AppStore from './AppStore'
import Map from './map/Map'
import LocationsList from './locationsList/list'

import * as waitForMapClickActionCreators from './actionCreators/waitForMapClick'
import autocompleteSelectActions from './actionCreators/autocompleteSelect'

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
            lheight: 0,
        }
        
        let params = AppStore.getState().mapParams

        // TODO: get these options from indexedDB etc...
        // locationsService.listAll({
        //     lat: params.center.lat,
        //     lng: params.center.lng,
        //     rad: params.rad,
        // })

        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        this.setState({
            lheight: this.listEl.scrollHeight
        })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row holder" ref={el => this.listEl = el}>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0 list">
                            <LocationsList 
                                lheight={this.state.lheight}
                                autocompleteSelect={this.props.autocompleteSelect}
                                selectedAutocompleteItem={this.props.selectedAutocompleteItem}
                                list={this.props.list}/>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0">
                            <Map 
                                list={this.props.list} 
                                mapParams={this.props.mapParams} 
                                waitForMapClick={this.props.waitForMapClick}
                                selectedAutocompleteItem={this.props.selectedAutocompleteItem}
                                toggleWaitForMapClick={this.props.toggleWaitForMapClick}/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const LinkedContainer = connect(mapStateToProps, mapDispatchToProps)(Container)


export default LinkedContainer


function mapStateToProps({list, mapParams, waitForMapClick, selectedAutocompleteItem}) {
    return { 
        list, 
        mapParams,
        waitForMapClick,
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
        toggleWaitForMapClick: () => {
            dispatch(waitForMapClickActionCreators.toggle())
        },
    }
}
