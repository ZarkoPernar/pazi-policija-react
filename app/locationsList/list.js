import React from 'react'
import TicketItem from './ticket'
import store from '../common/mapStore'
import dropdownStore from '../dropdown/dropdownStore'
import Filter from './filters'
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
            active: {},
            list: [],
        }
        this.itemSelect = this.itemSelect.bind(this)
    }
    itemSelect(location) {
        return () => {
            this.setState({active: location})
        }
    }
    componentDidMount() {
        store.subscribe((data) => {
            this.setState({list: data})
        })
        dropdownStore.subscribe(() => {
            console.log(dropdownStore.getState());
        })
    }

    render() {
        return (
            <div>
                <GoogleAutocomplete key="autoComplete" />
                <div key="list">
                    {renderFilters()}
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

function renderFilters() {
    return (
        <div className="filters" key="filters">
            <Filter options={['distance', 'upvotes']}
                active={dropdownStore.getState().active}
                isOpen={dropdownStore.getState().isOpen} />
        </div>
    )
}

export default LocationsList
