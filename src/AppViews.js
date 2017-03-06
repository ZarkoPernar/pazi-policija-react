import { createElement, Component } from 'react'
import { PureComponent } from 'react'
import { connect } from 'react-redux'

import AppView from './AppView'
import LocationsList from './locationsList/LocationsList'
import SearchResults from './search/SearchResults'
import Map from './map/Map'

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
                    <LocationsList />
                </AppView>

                <AppView key="map" viewName="map" activeView={this.props.activeView}>
                    <Map />
                </AppView>

                <AppView key="search" viewName="search" activeView={this.props.activeView}>   
                    <SearchResults />
                </AppView> 
            </div>
        )
    }
}

const mapStateToProps = ({  activeView }) => ({ activeView })

const LinkedAppViews = connect(mapStateToProps)(AppViews)

export default LinkedAppViews



