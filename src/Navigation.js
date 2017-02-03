import { h } from 'preact'
require('./navigation.scss')

import { ListIcon } from './icons/list'
import { MapPinIcon } from './icons/mapPin'
import { AvatarIcon } from './icons/avatar'
import { SearchIcon } from './icons/search'
import { PlusIcon } from './icons/plus'

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

export default Navigation