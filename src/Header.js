import { h, Component } from 'preact'
import { connect } from 'preact-redux'

require('./header.scss')

import { SearchBar } from './search/SearchBar'
import { CenterIcon } from './icons/center'
import { AddIcon } from './icons/add'
import { centerOnMe } from './actionCreators/map'
import { Logo } from './logo'
import AppStore from './AppStore'

class Header extends Component { 
    constructor() {
        super()

        this.addLocation = this.addLocation.bind(this)
    }

    addLocation() {
        AppStore.dispatch({type: 'TOGGLE_NEW_LOCATION_MODAL'})
    }

    render(props) {
        return (
            <div key="header" className="app-header">                          
                <SearchBar {...props} key="search-bar" />  

                <div className="header-buttons header-buttons--left" key="header-buttons--left">
                    <button onClick={this.addLocation} id="header-add-btn" className={'header-button header-button--special ' + (props.newLocationModal ? ' active ' : '')}>
                        <AddIcon />
                    </button>
                </div>

                <span className="app-header__title" key="view-title">
                    {/*{props.activeView.charAt(0).toUpperCase() + props.activeView.substring(1).toLowerCase()}*/}
                    <Logo />
                </span>

                <div className="header-buttons header-buttons--right" key="header-buttons--right">
                    <button onClick={centerOnMe} className="header-button header-button--special">
                        <CenterIcon />
                    </button>
                </div>
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