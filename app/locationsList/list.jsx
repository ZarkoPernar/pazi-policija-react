import service from '../common/locationsService'
import React from 'react'
import TicketItem from './ticket.jsx'

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
            active: {}
        }
        this.itemSelect = this.itemSelect.bind(this)
    }
    itemSelect(location) {
        return () => {
            this.setState({active: location})
        }
    }

    render() {
        return (
            <div className="tickets" style={{
                height: this.props.lheight
            }}>
                {this.props.list.map(loc => {
                    return <TicketItem activeStyle={this.state.active._id === loc._id
                        ? activeStyle
                        : null} key={loc._id} item={loc} onClick={this.itemSelect(loc)}/>
                })}
            </div>
        )
    }
}

export default LocationsList
