import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import AppStore from '../AppStore'
import { stripDataFromGeoposition } from '../common/geoLocation'
import { getCenterFromGeoposition } from '../actionCreators/map'
import { SearchResultItem } from './SearchResultItem'
import googleService from '../google-places/googlePlacesService'
import defaultResults from './defaults.json'

import './search-results.scss'

class SearchResults extends Component { 
    constructor() {
        super()

        this.presetResults = defaultResults.map(res => <SearchResultItem key={res.id} res={res} click={this.linkClick(res)} />)
        this.linkClick = this.linkClick.bind(this)
    }

    componentDidUnmount() {
        console.log('destroy search')
    }

    linkClick(item) {
        
        return () => {
            googleService.getDetails(item)
                .then(res => {
                    AppStore.dispatch(
                        getCenterFromGeoposition(stripDataFromGeoposition(res))
                    )
                })
        }
    }

    render({ searchParams }) {
        let results = Array.isArray(searchParams.results) ? searchParams.results.map(res => <SearchResultItem res={res} click={this.linkClick(res)} />) : null
        return (
            <div className="search-results">                          
                <div className="search-results__container">
                    <ul className="search-results__list">
                        { results || this.presetResults }
                    </ul>
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


