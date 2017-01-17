import { combineReducers } from 'redux'

import { activeViewReducer, newLocationModalReducer } from './reducers/appView'
import listReducer from './reducers/list'
import mapParamsReducer from './reducers/mapParams'
import selectedAutocompleteItemReducer from './reducers/selectedAutocompleteItem'

import waitForMapClickReducer from './reducers/waitForMapClick'

import { searchParamsReducer } from './search/reducer'

export default combineReducers({
    activeView: activeViewReducer,
    searchParams: searchParamsReducer,
    newLocationModal: newLocationModalReducer,
    list: listReducer,
    mapParams: mapParamsReducer,
    waitForMapClick: waitForMapClickReducer,
    selectedAutocompleteItem: selectedAutocompleteItemReducer,
})

