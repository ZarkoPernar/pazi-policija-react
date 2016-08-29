import React from 'react'

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
                <h4 className="ticket__title">{props.item.google_address}</h4>
            </div>
            <div className="ticket__dots">
                {dots}
            </div>
            <div className="ticket__right"></div>
        </div>
    )
}

export default ticket
