import { combineReducers } from 'redux'

import listReducer from './reducers/list'
import mapParamsReducer from './reducers/mapParams'
import selectedAutocompleteItemReducer from './reducers/selectedAutocompleteItem'

import waitForMapClickReducer from './reducers/waitForMapClick'

export default combineReducers({
    list: listReducer,
    mapParams: mapParamsReducer,
    waitForMapClick: waitForMapClickReducer,
    selectedAutocompleteItem: selectedAutocompleteItemReducer,
})

