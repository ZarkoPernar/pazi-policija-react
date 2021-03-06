import { createElement, Component } from 'react'
import { connect } from 'react-redux'

// import Perf from './perf'
import Navigation from './Navigation'
import Header from './header/Header'
import Toaster from './toast/Toaster'
import Modal from './modal/Modal'
import AddLocation from './addLocation/AddLocation'
import AppViews from './AppViews'
import GeoLocation from './GeoLocation'
import UserProfile from './user/Profile'

import { stripDataFromGeoposition } from './common/geoLocation'
import { setLocation } from './ducks/geolocation'
import { getCenterFromGeoposition } from './actionCreators/map'
import * as appViewActionCreators from './actionCreators/appView'

import './container.scss'
import './common/buttons.scss'

class Container extends Component {
    constructor() {
        super()

        this.changeView = {
            list: () => this.props.changeView('list'),
            map: () => this.props.changeView('map'),
            search: () => this.props.changeView('search'),
        }
    }

    componentWillUnmount() {
        console.log('destroy container')
    }
    
    render() {
        return (
            <div className="app-container">
                {/*<Perf key="perf" />*/}

                <Toaster key="toaster" />

                <Modal key="profile-modal" isOpen={this.props.modals.profile}>
                    <UserProfile />
                </Modal> 

                <Modal key="location-modal" isOpen={this.props.modals.newLocation}>
                    <AddLocation />
                </Modal>

                <GeoLocation key="geo" centerOn={this.props.centerOn} setGeolocation={this.props.setGeolocation} />

                <Header key="header" />

                <AppViews key="views" />                

                <Navigation key="nav" activeView={this.props.activeView} changeView={this.changeView} />
            </div>
        )
    }
}

const LinkedContainer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default LinkedContainer

function mapStateToProps({activeView, modals}) {
    return { 
        activeView,
        modals
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeView: (viewName) => {
            dispatch(
                appViewActionCreators.changeView(viewName)
            )
        },
        centerOn(res) {
            dispatch(getCenterFromGeoposition(res))
        },
        setGeolocation(res) {
            dispatch(setLocation(stripDataFromGeoposition(res)))
        }
    }
}
