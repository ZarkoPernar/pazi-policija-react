import { h } from 'preact'
import {distanceInWordsToNow} from 'date-fns' // /distanceInWordsToNow

require('./ticket.scss')
let dots = [
    1,
    2,
    3,
    4,
    5,
    6,
    7
]
const ticket = ({ onClick, activeStyle, item}) => {
    dots.map(x => <div className="ticket__dots__dot" key={x}></div>)

    return (
        <div onClick={onClick} className="ticket" style={activeStyle}>
            <div className="ticket__left">
                <h4 key="user" className="ticket__title">
                    {item.user}

                    <div key="created_at" className="ticket__title__created_at">
                        {distanceInWordsToNow(new Date(item.created_at))} ago
                    </div>
                </h4>
                <p key="body" className="ticket__body">
                    <div key="description">{item.description}</div>                      
                    <div key="google_address">{item.google_address}</div>                      
                </p>
            </div>
            <div className="ticket__dots">
                {dots}
            </div>
            <div className="ticket__right">
    
            </div>
        </div>
    )
}

export default ticket
