import { createElement, Component } from 'react'
import { PureComponent } from 'react'
import { connect } from 'react-redux'

import { SearchBar } from '../search/SearchBar'
import { AddIcon } from '../icons/add'
import { Logo } from './logo'

import './header.scss'

class Header extends PureComponent { 
    constructor() {
        super()
    }

    componentWillUnmount() {
        console.log('destroy header')
    }

    componentWillUpdate() {
        console.log('update header')
    }

    render() {
        return (
            <div className="app-header">                          
                <SearchBar key="search-bar" />  

                <Logo key="logo"/>

                <div key="header-buttons--right" className="header-buttons header-buttons--right">
                    <button onClick={this.props.toggleNewLocationModal} id="header-add-btn" 
                        className={'header-button header-button--special ' + (this.props.newLocationModal ? ' active ' : '')}>
                        <AddIcon />
                    </button>                    
                </div>
            </div>
        )
    }
}

const LinkedHeader = connect(mapStateToProps, mapDispatchToProps)(Header)

export default LinkedHeader

function mapStateToProps({newLocationModal}) {
    return { 
        newLocationModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleNewLocationModal() {
            dispatch({type: 'TOGGLE_NEW_LOCATION_MODAL'})
        }
    }
}