import React from 'react'
import { distanceInWordsToNow } from 'date-fns'

const ticket = (props) => {
    let dots = [
        1,
        2,
        3,
        4,
        5,
        6,
        7
    ].map(x => <div className="ticket__dots__dot" key={x}></div>)

    return (
        <div onClick={props.onClick} className="ticket" style={props.activeStyle}>
            <div className="ticket__left">
                <h4 key="user" className="ticket__title">{props.item.user}</h4>
                <p key="description">{props.item.description}</p>
            </div>
            <div className="ticket__dots">
                {dots}
            </div>
            <div className="ticket__right">
                {distanceInWordsToNow(new Date(props.item.created_at))} ago
            </div>
        </div>
    )
}

export default ticket
