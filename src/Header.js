import { h, Component } from 'preact'
import { connect } from 'preact-redux'

require('./header.scss')

import { SearchBar } from './search/SearchBar'

class Header extends Component { 
    constructor() {
        super()
    }

    render(props) {
        return (
            <div key="header" className="app-header">                          
                <SearchBar {...props} key="search-bar" />  
                <span className="app-header__title" key="view-title">
                    {props.activeView.charAt(0).toUpperCase() + props.activeView.substring(1).toLowerCase()}
                </span>
            </div>
        )
    }
}

const LinkedHeader = connect(mapStateToProps, mapDispatchToProps)(Header)

export default LinkedHeader

function mapStateToProps({activeView, searchParams}) {
    return { 
        activeView,
        searchParams,
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