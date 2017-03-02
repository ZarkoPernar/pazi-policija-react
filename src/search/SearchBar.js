import { h, Component } from 'preact'

import './search-bar.scss'

import { ACTIVE_VIEW_SEARCH } from '../Navigation'
import { SearchIcon } from '../icons/search'
import googleService from '../google-places/googlePlacesService'

const ENTER_KEY = 13
export class SearchBar extends Component { 
    constructor() {
        super()

        this.getEl = this.getEl.bind(this)
        this.onKeydown = this.onKeydown.bind(this)
        this.onBlur = this.onBlur.bind(this)
    }

    onKeydown(event) {
        console.log(event)
        if (event.keyCode === ENTER_KEY) {
            this.inputEl.blur()
            this.props.onSearchEnter(event)
        } else {
            this.autoSearch()
            this.props.onSearchKeydown(event)
        }
    }

    autoSearch() {
        let input = this.inputEl.value
        if (input.length < 2) return

        googleService.auto({
            input
        }).then(res => {
            console.log(res)
        })
    }

    // getStuff() {

    // }

    onBlur() {
        this.exited = true
    }

    componentDidUpdate() {
        if (!this.exited && this.props.activeView === ACTIVE_VIEW_SEARCH && this.inputEl) {
            this.inputEl.focus()
        }

        if (this.props.activeView !== ACTIVE_VIEW_SEARCH) {
            this.exited = false
        }
    }

    getEl(el) {
        this.inputEl = el
        if (!this.firstRender && this.props.activeView === ACTIVE_VIEW_SEARCH) {
            this.inputEl.focus()
            this.firstRender = true
        }
    }

    render({ activeView }) {
        let inputEl
        if (activeView === ACTIVE_VIEW_SEARCH && inputEl) {
            inputEl.focus()
        }

        return (        
            <div id="search-bar" key="search" className={activeView === 'search' ? 'search-bar--visible' : ''}>
                <div className="search-bar__container">
                    <SearchIcon key="search-icon" className="search-bar__icon" />
                    <input placeholder="Search" key="search-input" className="search-bar__input" onBlur={this.onBlur} onKeyDown={this.onKeydown} ref={this.getEl}/>
                </div>
            </div>
        )
    }
}
