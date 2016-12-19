import React, {Component} from 'react'
import { connect } from 'react-redux'

import AppStore from './AppStore'
import Map from './map/Map'
import LocationsList from './locationsList/list'

import locationsService from './common/locationsService'

class App extends Component {
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
            lheight: this.refs.list.scrollHeight
        })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row holder" ref="list">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0 list">
                            <LocationsList list={this.props.list} lheight={this.state.lheight}/>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0">
                            <Map list={this.props.list} mapParams={this.props.mapParams} />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const LinkedApp = connect(mapStateToProps)(App)


export default LinkedApp


function mapStateToProps({list, mapParams}) {
    return { 
        list: list, 
        mapParams: mapParams,
    }
}