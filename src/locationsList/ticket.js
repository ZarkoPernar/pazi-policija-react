import { h } from 'preact'
import {distanceInWordsToNow} from 'date-fns' // /distanceInWordsToNow
import hrLocale from 'date-fns/locale/hr'

require('./ticket.scss')
let dots = [
    1,
    2,
    3,
    4,
    5,
    6,
    7
].map(x => <div className="ticket__dots__dot" key={x}></div>)

const ticket = ({ onClick, activeStyle, item}) => {
    

    return (
        <div onClick={onClick} className="ticket" style={activeStyle}>
            <div className="ticket__left">
                <h4 key="user" className="ticket__title">
                    {item.user}

                    <div key="created_at" className="ticket__title__created_at">
                        {distanceInWordsToNow(new Date(item.seen_at || item.created_at), {locale: hrLocale})}
                    </div>
                </h4>
                <p key="body" className="ticket__body">
                    <div key="description">{item.description}</div>                      
                    <div key="google_address">{item.google_address}</div>                      
                </p>
            </div>
            {/*<div className="ticket__dots">
                {dots}
            </div>
            <div className="ticket__right">
    
            </div>*/}
        </div>
    )
}

export default ticket
