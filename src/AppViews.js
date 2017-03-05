import { createElement, Component } from 'react'
import { PureComponent } from 'react'
import { connect } from 'react-redux'

import AppView from './AppView'
import LocationsList from './locationsList/LocationsList'
import SearchResults from './search/SearchResults'
import Map from './map/Map'

import * as waitForMapClickActionCreators from './actionCreators/waitForMapClick'
import autocompleteSelectActions from './actionCreators/autocompleteSelect'
import * as locationActionCreators from './actionCreators/locations'

class AppViews extends PureComponent {
    constructor() {
        super()
    }

    componentWillUnmount() {
        console.log('destroy app views')
    }

    render() {
        return (
            <div className="app-view-container">
                <AppView key="list" viewName="list" activeView={this.props.activeView}>
                    <LocationsList autocompleteSelect={this.props.autocompleteSelect} selectedAutocompleteItem={this.props.selectedAutocompleteItem} list={this.props.list}/>
                </AppView>

                <AppView key="map" viewName="map" activeView={this.props.activeView}>
                    <Map list={this.props.list} mapParams={this.props.mapParams} selectedAutocompleteItem={this.props.selectedAutocompleteItem} addItems={this.props.addItems} />
                </AppView>

                <AppView key="search" viewName="search" activeView={this.props.activeView}>   
                    <SearchResults />
                </AppView> 
            </div>
        )
    }
}

const LinkedAppViews = connect(mapStateToProps, mapDispatchToProps)(AppViews)

export default LinkedAppViews

function mapStateToProps({
        selectedAutocompleteItem,
        list,
        mapParams,
        activeView
    }) {
    return { 
        selectedAutocompleteItem,
        list,
        mapParams,
        activeView
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addItems(data) {
            dispatch(locationActionCreators.addItems(data))
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

