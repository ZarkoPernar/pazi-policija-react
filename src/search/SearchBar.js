import { createElement, Component } from 'react'
import { PureComponent } from 'react'
import { connect } from 'react-redux'

import './search-bar.scss'

import { ACTIVE_VIEW_SEARCH } from '../Navigation'
import { SearchIcon } from '../icons/search'
import googleService from '../google-places/googlePlacesService'

const ENTER_KEY = 13

export class SearchBar extends PureComponent { 
    constructor() {
        super()

        this.getEl = this.getEl.bind(this)
        this.onKeydown = this.onKeydown.bind(this)
    }

    onKeydown(event) {
        if (event.keyCode === ENTER_KEY) {
            this.props.onSearchEnter(event)
        } else {
            this.autoSearch()
            this.props.onSearchKeydown(event)
        }
    }

    autoSearch() {
        let input = this.inputEl.value
        if (!input) return this.props.onSearchResults(null)

        googleService.auto({
            input,
            types: 'geocode'
        })
        .then((res) => {
            this.props.onSearchResults(res)
        })
        .catch((err) => { })
    }

    getEl(el) {
        this.inputEl = el
    }

    render() {
        return (        
            <div id="search-bar" className={this.props.activeView === 'search' ? 'search-bar--visible' : ''}>
                <div className="search-bar__container">
                    <SearchIcon key="search-icon" className="search-bar__icon" />
                    <input key="search-input" placeholder="Search"  className="search-bar__input" onKeyDown={this.onKeydown} ref={this.getEl}/>
                </div>
            </div>
        )
    }
}

const LinkedSearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar)

export default LinkedSearchBar

function mapStateToProps({ activeView }) {
    return { 
        activeView,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSearchKeydown: (event) => {
            dispatch({
                type: 'SEARCH_KEYDOWN',
                payload: {
                    inputValue: event.target.value
                }
            })
        },
        onSearchResults: (res) => {
            dispatch({
                type: 'LOAD_SEARCH_RESULTS',
                payload: {
                    res
                }
            })
        },
        onSearchEnter: (event) => {
            dispatch({
                type: 'SEARCH_ENTER',
                payload: {
                    inputValue: event.target.value
                }
            })
        },
    }
}