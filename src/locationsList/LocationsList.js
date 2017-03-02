import { Component, h } from 'preact'

import TicketItem from './ticket'

var scss = require('./list.scss')
let activeStyle = {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // width: '100%',
}

class LocationsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: {},
        }
        this.itemSelect = this.itemSelect.bind(this)
    }
    itemSelect(location) {
        return function() {
            this.setState({active: location})
        }.bind(this)
    }

    render({list}) {
        return (
            <div className="location-list">
                <div key="list" className="tickets-scroll">
                    <div className="tickets" key="tickets">
                        {
                            list.map(loc => {
                                return <TicketItem activeStyle={this.state.active._id === loc._id
                                    ? activeStyle
                                    : null} key={loc._id} item={loc} onClick={this.itemSelect(loc)}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default LocationsList
