import { Component, h } from 'preact'
import { connect } from 'preact-redux'

import AppStore from './AppStore'
import Map from './map/Map'
import LocationsList from './locationsList/LocationsList'
import Navigation from './Navigation'
import Header from './Header'
import SearchResults from './search/SearchResults'

import * as waitForMapClickActionCreators from './actionCreators/waitForMapClick'
import autocompleteSelectActions from './actionCreators/autocompleteSelect'
import appViewActionCreators from './actionCreators/appView'
require('./container.scss')

let width = document.body.offsetWidth

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
            lheight: 0,
        }
        
        let params = AppStore.getState().mapParams

        this.changeView = {
            add: () => AppStore.dispatch({type: 'CHANGE_APP_VIEW', payload: 'add'}),
            list: () => AppStore.dispatch({type: 'CHANGE_APP_VIEW', payload: 'list'}),
            map: () => AppStore.dispatch({type: 'CHANGE_APP_VIEW', payload: 'map'}),
            profile: () => AppStore.dispatch({type: 'CHANGE_APP_VIEW', payload: 'profile'}),
            search: () => AppStore.dispatch({type: 'CHANGE_APP_VIEW', payload: 'search'}),
        }

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
            <div className="app-container">
                <Header activeView={this.props.activeView} searchParams={this.props.searchParams} onSearchKeydown={this.props.onSearchKeydown} key="header" />
                <div key="views" className="app-view-container" ref={el => this.listEl = el}>
                    {<div key="list" className={'app-view' + ' ' + (this.props.activeView === 'list' ? 'app-view--active' : '')}>
                        <LocationsList 
                            lheight={this.state.lheight}
                            autocompleteSelect={this.props.autocompleteSelect}
                            selectedAutocompleteItem={this.props.selectedAutocompleteItem}
                            list={this.props.list}/>
                    </div>}

                    <div key="map" className={'app-view' + ' ' + (this.props.activeView === 'map' ? 'app-view--active' : '')}>
                        <Map 
                            list={this.props.list} 
                            mapParams={this.props.mapParams} 
                            waitForMapClick={this.props.waitForMapClick}
                            selectedAutocompleteItem={this.props.selectedAutocompleteItem}
                            toggleWaitForMapClick={this.props.toggleWaitForMapClick}/>
                    </div>

                    <div key="search" className={'app-view' + ' ' + (this.props.activeView === 'search' ? 'app-view--active' : '')}>
                        <SearchResults />
                    </div>                    
                </div>
                <Navigation key="nav" activeView={this.props.activeView} changeView={this.changeView} />
            </div>

        )
    }
}

const LinkedContainer = connect(mapStateToProps, mapDispatchToProps)(Container)


export default LinkedContainer


function mapStateToProps({activeView, searchParams, list, mapParams, waitForMapClick, selectedAutocompleteItem}) {
    return { 
        activeView,
        searchParams,
        list, 
        mapParams,
        waitForMapClick,
        selectedAutocompleteItem,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSearchKeydown: (event) => {
            console.log(event)
            dispatch({
                type: 'SEARCH_KEYDOWN',
                payload: {
                    inputValue: event.target.value
                }
            })
        },
        changeView: (viewName) => {
            dispatch(
                appViewActionCreators.change(viewName)
            )
        },
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
