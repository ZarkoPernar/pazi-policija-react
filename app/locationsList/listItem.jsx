import service from '../common/locationsService';
import React from 'react';

const listItem = (props) => {
	let style = props.activeStyle
	if (style) {
		
	}
	return (		
		<li 
			onClick={props.onClick}
			className="location-list__item" style={props.activeStyle}>
			{props.item.google_address}
		</li>
	)
}

export default listItem