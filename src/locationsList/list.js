import React from 'react'
import TicketItem from './ticket'
import store from '../common/mapStore'

import Filters from './filters'
import GoogleAutocomplete from '../google-places/googleAutocomplete'

var scss = require('./list.scss')
let activeStyle = {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // width: '100%',
}

class LocationsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            active: {},
        }
        this.itemSelect = this.itemSelect.bind(this)
    }
    itemSelect(location) {
        return () => {
            this.setState({active: location})
        }
    }
    componentDidMount() {
        store.subscribe('list_loaded', (data) => {
            this.setState({list: data})
        })
    }

    render() {
        return (
            <div>
                <GoogleAutocomplete key="autoComplete" />
                <div key="list">
                    {/*<Filters key="filters" />*/}
                    <div className="tickets" key="tickets" style={{
                            height: this.props.lheight
                        }}>
                        {this.state.list.map(loc => {
                            return <TicketItem activeStyle={this.state.active._id === loc._id
                                ? activeStyle
                                : null} key={loc._id} item={loc} onClick={this.itemSelect(loc)}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default LocationsList
