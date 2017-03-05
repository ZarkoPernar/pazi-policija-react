import { Component, h } from 'preact'
import { connect } from 'preact-redux'

import Navigation from './Navigation'
import Header from './header/Header'
import Toaster from './toast/Toaster'
import Modal from './modal/Modal'
import AddLocation from './addLocation/AddLocation'
import AppViews from './AppViews'
import GeoLocation from './GeoLocation'

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

    componentDidUnmount() {
        console.log('destroy container')
    }
    
    render({ 
        centerOn, 
        newLocationModal, 
        activeView
    }) {
        return (
            <div className="app-container">
                <Toaster key="toaster" />

                <Modal key="modal" isOpen={newLocationModal}>
                    <AddLocation />
                </Modal>

                <GeoLocation key="geo" centerOn={centerOn} />

                <Header key="header" />

                <AppViews key="views" />                

                <Navigation key="nav" activeView={activeView} changeView={this.changeView} />
            </div>
        )
    }
}

const LinkedContainer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default LinkedContainer

function mapStateToProps({activeView, newLocationModal}) {
    return { 
        activeView,
        newLocationModal
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
        }
    }
}
