import types from '../types/waitForMapClick'

export function toggle() {
  return {
    type: types.TOGGLE_WAIT_FOR_MAP_CLICK,
    payload: null
  }
}

export function setValue(value) {
  if (value === undefined) {
    return {}
  }

  return {
    type: types.SET_WAIT_FOR_MAP_CLICK,
    payload: value
  }
}
