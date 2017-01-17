import { Component, h } from 'preact'
import TicketItem from './ticket'
import store from '../common/mapStore'

import Filters from './filters'
import ListOptions from './ListOptions'
import GoogleAutocomplete from '../google-places/googleAutocomplete'

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

    render({lheight, list}) {
        return (
            <div className="location-list">
                <div className="location-list__add">
                    <GoogleAutocomplete 
                        key="autoComplete" 
                        selectedAutocompleteItem={this.props.selectedAutocompleteItem} 
                        autocompleteSelect={this.props.autocompleteSelect}/>
                    <ListOptions 
                        key="listOptions" />
                </div>
                <div key="list" className="tickets-scroll">
                    {/*<Filters key="filters" />*/}
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
