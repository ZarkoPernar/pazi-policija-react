import { createElement, Component } from 'react'
import { connect } from 'react-redux'

import autocompleteSelectActions from '../actionCreators/autocompleteSelect'

import Loader from '../common/loader'
import Ticket from './Ticket'

import './list.scss'

class LocationsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: {},
        }
        this.createItemSelect = this.createItemSelect.bind(this)
    }

    createItemSelect(location) {

    }

    componentWillUnmount() {
        console.log('destroy list')
    }

    render() {
        return (
            <div className="location-list">
                <div key="list" className="tickets-scroll">
                    <div className="tickets" key="tickets">
                        {
                            this.props.list.map(loc => {
                                return <Ticket key={loc._id} item={loc} onClick={this.createItemSelect(loc)}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const LinkedLocationsList = connect(mapStateToProps, mapDispatchToProps)(LocationsList)

function mapStateToProps({ selectedAutocompleteItem, list }) {
    return {
        selectedAutocompleteItem,
        list,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        autocompleteSelect(item) {
            dispatch(autocompleteSelectActions.select(item))
        }
    }
}

export default LinkedLocationsList
