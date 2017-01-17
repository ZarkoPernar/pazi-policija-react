import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import { MapPinIcon } from '../icons/mapPin'
import { centerOnMe } from '../actionCreators/map'
require('./search-results.scss')

const fakeResults = [
    {
        text: 'Zagreb',
    }, {
        text: 'Pula',
    }, {
        text: 'Rijeka',
    }, {
        text: 'Split',
    }, {
        text: 'Pula',
    }, {
        text: 'Rijeka',
    }, {
        text: 'Split',
    }, {
        text: 'Pula',
    }, {
        text: 'Rijeka',
    }, {
        text: 'Split',
    }, {
        text: 'Pula',
    }, {
        text: 'Rijeka',
    }, {
        text: 'Split',
    }, {
        text: 'Pula',
    }, {
        text: 'Rijeka',
    }, {
        text: 'Split',
    }, {
        text: 'Pula',
    }, {
        text: 'Rijeka',
    }, {
        text: 'Split',
    },
]

class SearchResults extends Component { 
    constructor() {
        super()
    }

    render({ searchParams }) {
        return (
            <div className="search-results">                          
                <div className="search-results__container">
                    <ul className="search-results__list">
                        {
                            fakeResults.map((res, i) => (
                                <li className="search-results__list__item" key={i}>
                                    <a href={res.text} className="search-results__list__item__link">
                                        {res.text}
                                    </a>
                                </li>
                            ))
                        }
                                
                    </ul>
                </div>

                <div className="search-results__near-me" key="near-me">
                    <button onClick={centerOnMe}>
                        <MapPinIcon />
                        Search Near Me
                    </button>
                </div>
            </div>
        )
    }
}

const LinkedSearchResults = connect(mapStateToProps)(SearchResults)

export default LinkedSearchResults

function mapStateToProps({searchParams}) {
    return { 
        searchParams,
    }
}

