import service from '../common/locationsService';
import React from 'react';
import ListItem from './listItem.jsx'

var scss = require('./listItem.scss')
let activeStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
}

class LocationsList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			active: {},
		}
		this.itemSelect = this.itemSelect.bind(this)
	}
	itemSelect(location) {
		return (e) => {
			this.setState({
				active: location
			})
		}
	}
	render() {
		return (
			<ul className="location-list" style={{height: this.props.lheight}}>
				{this.props.list.map(loc => {
					return <ListItem 
								activeStyle={this.state.active._id === loc._id ? activeStyle : null}
								key={loc._id} item={loc} 
								onClick={this.itemSelect(loc)} />
				})}
			</ul>
		)
	}
}

export default LocationsList