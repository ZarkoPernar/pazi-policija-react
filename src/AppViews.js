import { h } from 'preact'
import { PureComponent } from 'preact-compat'
import { connect } from 'preact-redux'

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

    componentDidUnmount() {
        console.log('destroy app views')
    }

    render({
        activeView,
        selectedAutocompleteItem,
        list,
        mapParams,
        autocompleteSelect,
        addItems
    }) {
        return (
            <div className="app-view-container">
                <AppView key="list" viewName="list" activeView={activeView}>
                    <LocationsList autocompleteSelect={autocompleteSelect} selectedAutocompleteItem={selectedAutocompleteItem} list={list}/>
                </AppView>

                <AppView key="map" viewName="map" activeView={activeView}>
                    <Map list={list} mapParams={mapParams} selectedAutocompleteItem={selectedAutocompleteItem} addItems={addItems} />
                </AppView>

                <AppView key="search" viewName="search" activeView={activeView}>   
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

