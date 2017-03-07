import { combineReducers } from 'redux'

import { activeViewReducer, newLocationModalReducer } from './reducers/appView'
import listReducer from './reducers/list'
import mapParamsReducer from './reducers/mapParams'
import selectedAutocompleteItemReducer from './reducers/selectedAutocompleteItem'

import waitForMapClickReducer from './reducers/waitForMapClick'

import { searchParamsReducer } from './search/reducer'
import { toastsReducer } from './toast/reducer'
import geolocationReducer from './ducks/geolocation'

export default combineReducers({
    geolocation: geolocationReducer,
    activeView: activeViewReducer,
    searchParams: searchParamsReducer,
    toasts: toastsReducer,
    newLocationModal: newLocationModalReducer,
    list: listReducer,
    mapParams: mapParamsReducer,
    waitForMapClick: waitForMapClickReducer,
    selectedAutocompleteItem: selectedAutocompleteItemReducer,
})

