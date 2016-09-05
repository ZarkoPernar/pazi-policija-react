var assert = require('chai').assert
var expect = require('chai').expect
var should = require('chai').should()

var service = require('./locationsService')

describe('locationsService', function() {

  describe('listAll()', function() {

    it('should exist', function() {
      should.exist(service.listAll)
    })

    it('should return an array', function() {
    	service.listAll().should.eventualy.exist()
    })

  })

})
