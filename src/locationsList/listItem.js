import { createElement, Component } from 'react'

const listItem = (props) => {
	let style = props.activeStyle
	if (style) {
		
	}
	return (		
		<li 
			onClick={props.onClick}
			className="location-list__item" style={props.activeStyle}>
			{props.item.description}
		</li>
	)
}

export default listItem