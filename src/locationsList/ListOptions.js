import { Component, h } from 'preact'
import { connect } from 'preact-redux'

import MyButton from '../common/button'
import AppStore from '../AppStore'
import mapStore from '../common/mapStore'
import * as waitForMapClickActionCreators from '../actionCreators/waitForMapClick'
import * as mapActionCreators from '../actionCreators/map'

class ListOptions extends Component {
    constructor(props) {
        super(props)

        mapStore.subscribe('google_autocomplete_selected', (place) => {

        })
        mapStore.subscribe('google_map_selected', (place) => {
            this.selectedLocation = place
        })
    }   

    centerOnMe() {
        new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        }).then((res) => {
            AppStore.dispatch({
                type: 'CHANGE',
                payload: {
                    center: {
                        lat: res.coords.latitude,
                        lng: res.coords.longitude,
                    }
                }
                
            })
        })
    }

    render({waitForMapClick, toggleWaitForMapClick}) {
        return (
            <div>
                <MyButton 
                    ripple={true}
                    customClasses={'mdl-button--raised mdl-button--colored'}
                    onClick={toggleWaitForMapClick} 
                    style={{'margin-right': '10px'}}>

                    {waitForMapClick ? 'Wait For The Click' : 'Click on the map'}
                </MyButton>

                <MyButton 
                    customClasses={'mdl-button--raised mdl-button--colored'}
                    onClick={this.centerOnMe}
                    style={{'margin-right': '10px'}}>
                    Center On Me
                </MyButton>
                
            </div>
        )
    }
}

const LinkedListOptions = connect(mapStateToProps, mapDispatchToProps)(ListOptions)

export default LinkedListOptions


function mapStateToProps({waitForMapClick}) {
    return { 
        waitForMapClick,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleWaitForMapClick: () => {
            dispatch(waitForMapClickActionCreators.toggle())
        },
        // centerOnMe: () => {
        //     mapActionCreators.centerOnMe(dispatch)
        // },
    }
}