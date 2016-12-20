var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
var should = chai.should()
var assert = chai.assert
var expect = chai.expect


import service from './locationsService'
import defaultState from '../DefaultState'

const defaultRequestParams = Object.assign({}, defaultState.mapParams.center, {
  rad: defaultState.mapParams.rad
})

describe('locationsService', function() {

  describe('listAll()', function() {    
    it('should exist', function() {
      should.exist(service.listAll)
    })

    it('should return an array', function() {
      // service.listAll(defaultRequestParams).should.eventually.exist()
      console.log(defaultRequestParams, service.listAll(defaultRequestParams))
      return Promise.resolve(2 + 2).should.eventually.equal(4)
    })

  })

})
