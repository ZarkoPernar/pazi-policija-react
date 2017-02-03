import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import { MapPinIcon } from '../icons/mapPin'
import { centerOnMe } from '../actionCreators/map'
require('./search-results.scss')

const fakeResults = [
    {
        displayName: 'Zagreb',
    }, {
        displayName: 'Split',
    }, {
        displayName: 'Osijek',
    }, {
        displayName: 'Zadar',
    }, {
        displayName: 'Slavonski Brod',
    }, {
        displayName: 'Pula',
    }, {
        displayName: 'Sesvete',
    }, {
        displayName: 'Kastela',
    }, {
        displayName: 'Karlovac',
    }, {
        displayName: 'Sisak',
    }, {
        displayName: 'Varazdin',
    }, {
        displayName: 'Sibenik',
    }, {
        displayName: 'Velika Gorica',
    }, {
        displayName: 'Vinkovci',
    }, {
        displayName: 'Vukovar',
    }, {
        displayName: 'Bjelovar',
    }, {
        displayName: 'Dubrovnik',
    }, {
        displayName: 'Koprivnica',
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
                        <li key="searchParams">{searchParams.inputValue}</li>
                        {
                            fakeResults.map((res, i) => (
                                <li className="search-results__list__item" key={i}>
                                    <a href={res.displayName} className="search-results__list__item__link">
                                        {res.displayName}
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

