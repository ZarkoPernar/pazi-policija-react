import { createElement, Component } from 'react'
import { connect } from 'react-redux'

import AppStore from '../AppStore'
import { getCenterFromGooglePlace } from '../actionCreators/map'
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

    componentWillUnmount() {
        console.log('destroy search')
    }

    linkClick(item) {
        
        return () => {
            googleService.getDetails(item)
                .then(res => {
                    AppStore.dispatch(
                        getCenterFromGooglePlace(res)
                    )
                })
        }
    }

    render() {
        let results = Array.isArray(this.props.searchParams.results) ? this.props.searchParams.results.map(res => <SearchResultItem res={res} click={this.linkClick(res)} />) : null
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


