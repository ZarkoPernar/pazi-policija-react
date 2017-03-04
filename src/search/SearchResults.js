import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import { MapPinIcon } from '../icons/mapPin'
import { centerOnMe } from '../actionCreators/map'
require('./search-results.scss')
import { SearchResultItem } from './SearchResultItem'
import googleService from '../google-places/googlePlacesService'

const fakeResults = [
    {
        description: 'Zagreb',
        id: 'Zagreb',
    }, {
        description: 'Split',
        id: 'Split',
    }, {
        description: 'Osijek',
        id: 'Osijek',
    }, {
        description: 'Zadar',
        id: 'Zadar',
    }, {
        description: 'Slavonski Brod',
        id: 'Slavonski Brod',
    }, {
        description: 'Pula',
        id: 'Pula',
    }, {
        description: 'Sesvete',
        id: 'Sesvete',
    }, {
        description: 'Kastela',
        id: 'Kastela',
    }, {
        description: 'Karlovac',
        id: 'Karlovac',
    }, {
        description: 'Sisak',
        id: 'Sisak',
    }, {
        description: 'Varazdin',
        id: 'Varazdin',
    }, {
        description: 'Sibenik',
        id: 'Sibenik',
    }, {
        description: 'Velika Gorica',
        id: 'Velika Gorica',
    }, {
        description: 'Vinkovci',
        id: 'Vinkovci',
    }, {
        description: 'Vukovar',
        id: 'Vukovar',
    }, {
        description: 'Bjelovar',
        id: 'Bjelovar',
    }, {
        description: 'Dubrovnik',
        id: 'Dubrovnik',
    }, {
        description: 'Koprivnica',
        id: 'Koprivnica',
    },
]


class SearchResults extends Component { 
    constructor() {
        super()

        this.presetResults = fakeResults.map(res => <SearchResultItem res={res} click={this.linkClick} />)
        this.linkClick = this.linkClick.bind(this)
    }

    linkClick(event) {
        googleService.auto({
            input: 'a',
            types: '(cities)' 
        })
        .then(console.log)
    }

    render({ searchParams }) {
        let results = Array.isArray(searchParams.results) ? searchParams.results.map(res => <SearchResultItem res={res} click={this.linkClick} />) : null
        return (
            <div className="search-results">                          
                <div className="search-results__container">
                    <ul className="search-results__list">
                        { results || this.presetResults }
                    </ul>
                </div>

                {/*<div className="search-results__near-me" key="near-me">
                    <button onClick={centerOnMe}>
                        <MapPinIcon />
                        Search Near Me
                    </button>
                </div>*/}
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


