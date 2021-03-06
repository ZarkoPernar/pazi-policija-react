import { createElement, Component } from 'react'

import './navigation.scss'

import { ListIcon } from './icons/list'
import { MapPinIcon } from './icons/mapPin'
import { AvatarIcon } from './icons/avatar'
import { SearchIcon } from './icons/search'
import { PlusIcon } from './icons/plus'
import { CenterIcon } from './icons/center'
import { centerOnMe } from './actionCreators/map'

export const ACTIVE_VIEW_SEARCH = 'search'

const Navigation = ({changeView, activeView, search}) => (
    <div key="nav" className="app-view-nav app-view-nav--horizontal">
        <a onClick={changeView.add} key="add" className={'app-view-nav__item app-view-nav__item--horizontal ' + (activeView === 'add' ? 'app-view-nav__item--active' : '')}>
            <PlusIcon />
            Add
        </a>
        <a onClick={changeView.list} key="list" className={'app-view-nav__item app-view-nav__item--horizontal ' + (activeView === 'list' ? 'app-view-nav__item--active' : '')}>
            <ListIcon />
            List
        </a>
        <a onClick={changeView.search} key="search" className={'app-view-nav__item app-view-nav__item--horizontal app-view-nav__item--central ' + (activeView === 'search' ? 'app-view-nav__item--active' : '')}>
            <SearchIcon />
            Search
        </a>
        <a onClick={changeView.map} key="map" className={'app-view-nav__item app-view-nav__item--horizontal ' + (activeView === 'map' ? 'app-view-nav__item--active' : '')}>
            <MapPinIcon />
            Map
        </a>
        <a onClick={changeView.profile} key="profile" className={'app-view-nav__item app-view-nav__item--horizontal ' + (activeView === 'profile' ? 'app-view-nav__item--active' : '')}>
            <AvatarIcon />
            Profile
        </a>
    </div>
)


const AltNavigation = ({ activeView, changeView }) => {
    return (
        <div className={'app-view-nav app-view-nav--horizontal app-view-nav--alt ' + ('app-view-nav--active-view-' + activeView)}>
            <div key="slider" className="app-view-nav__slider">
                <div className="app-view-nav__slider__container">
                    <div key="list" className="app-view-nav__slider__item">
                        <ListIcon />
                    </div>

                    <div key="map" className="app-view-nav__slider__item">
                        <MapPinIcon />
                    </div>

                    <div key="search" className="app-view-nav__slider__item">
                        <SearchIcon />
                    </div>
                </div>
            </div>

            <div key="links" className="app-view-nav__links">
                <a onClick={changeView.list} key="list" className={'app-view-nav__item app-view-nav__item--horizontal ' + (activeView === 'list' ? 'app-view-nav__item--active' : '')}>
                    <ListIcon />
                </a>

                <a onClick={changeView.map} key="map" className={'app-view-nav__item app-view-nav__item--horizontal ' + (activeView === 'map' ? 'app-view-nav__item--active' : '')}>
                    <MapPinIcon />
                </a>

                <a onClick={changeView.search} key="search" className={'app-view-nav__item app-view-nav__item--horizontal ' + (activeView === 'search' ? 'app-view-nav__item--active' : '')}>
                    <SearchIcon />
                </a>

                <a onClick={centerOnMe} className="app-view-nav__item app-view-nav__item--horizontal app-view-nav__item--fab">
                    <CenterIcon />
                </a>
            </div>
        </div>
    )
}


export default AltNavigation