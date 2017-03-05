import { h } from 'preact'
import { PureComponent } from 'preact-compat'
import { connect } from 'preact-redux'
import { createSelector } from 'reselect'
import { SearchBar } from '../search/SearchBar'
import { AddIcon } from '../icons/add'
import { Logo } from './logo'

import './header.scss'

class Header extends PureComponent { 
    constructor() {
        super()
    }

    componentDidUnmount() {
        console.log('destroy header')
    }

    componentWillUpdate() {
        console.log('update header')
    }

    render({ toggleNewLocationModal, newLocationModal }) {
        return (
            <div className="app-header">                          
                <SearchBar key="search-bar" />  

                <Logo key="logo"/>

                <div key="header-buttons--right" className="header-buttons header-buttons--right">
                    <button onClick={toggleNewLocationModal} id="header-add-btn" 
                        className={'header-button header-button--special ' + (newLocationModal ? ' active ' : '')}>
                        <AddIcon />
                    </button>                    
                </div>
            </div>
        )
    }
}

const LinkedHeader = connect(mapStateToProps, mapDispatchToProps)(Header)

export default LinkedHeader

const nelSec = state => state.newLocationModal

function mapStateToProps({newLocationModal}) {
    return { 
        newLocationModal: nelSec
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleNewLocationModal() {
            dispatch({type: 'TOGGLE_NEW_LOCATION_MODAL'})
        }
    }
}