var chai = require('chai')
var should = chai.should()
var assert = chai.assert
var expect = chai.expect

import AppStore from '../AppStore'
import defaultState from '../DefaultState'

import reducer from './waitForMapClick'
import { toggle, setValue } from './../actionCreators/waitForMapClick'

const defaultRequestParams = Object.assign({}, defaultState.mapParams.center, {
  rad: defaultState.mapParams.rad
})

describe('waitForMapClickReducer', function() {

  describe('reducer', function() {    
    test('should exist', function() {
      should.exist(reducer)
    })

    test('default should return false', function() {
        reducer(undefined, {}).should.equal(false)
    })

    test('toggle should return opposite boolean', function() {
        let prevState = AppStore.getState().waitForMapClick
        let nextState = reducer(prevState, toggle())
        
        expect(nextState).to.equal(!prevState)
    })

    test('setValue should return value sent', function() {
        let prevState = AppStore.getState().waitForMapClick
        let sentValue = true
        let nextState = reducer(prevState, setValue(sentValue))
        
        expect(nextState).to.equal(sentValue)
    })

  })

})
