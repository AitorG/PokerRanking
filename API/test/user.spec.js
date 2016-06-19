'use strict'
let should = require('should')
let mongoose = require('mongoose');
let config = require('./../config');
let User = require('./../models/user')
mongoose.connect(config.database);

describe('UserSpec', () => {
  describe('createUser', () => {
    it('Should return a error if username or password or admin are null', (done) => {
      let userToCreate = {
        username: null,
        password: null,
        admin: null,
        points: null,
        lastGame: null,
      }
      User.createUser(userToCreate, (err, user) => {
        err.message.should.be.equal('User validation failed')
        done()
      })
    })

    it('Should return a error if username are in use', (done) => {
      let userToCreate = {
        username: 'zamarrowski',
        password: 'lolazo03',
        admin: true,
        points: null,
        lastGame: null,
      }
      User.createUser(userToCreate, (err, user) => {
        err.message.should.be.equal('Username in use')
        done()
      })
    })

    it('Should return a error if points or lastGame are not null', (done) => {
      let userToCreate = {
        username: Math.random(),
        password: Math.random(),
        admin: false,
        points: 54,
        lastGame: new Date()
      }
      User.createUser(userToCreate, (err, user) => {
        err.message.should.be.equal('Points and lastgame should be null')
        done()
      })
    })

    it('Should return a doc with user', (done) => {
      let userToCreate = {
        username: Math.random().toString(),
        password: Math.random().toString(),
        admin: false,
        points: null,
        lastGame: null
      }
      User.createUser(userToCreate, (err, user) => {
        user.username.should.be.equal(userToCreate.username)
        user.admin.should.be.equal(userToCreate.admin)
        done()
      })
    })
  })

  describe('removeById()', () => {

    it('Should return n:1 and ok:1 when delete a user', (done) => {
      let userToCreate = {
        username: Math.random().toString(),
        password: 'password',
        admin: false,
        points: null,
        lastGame: null
      }
      User.createUser(userToCreate, (err, user) => {
        User.removeById(user._id, (err, response) => {
          response.result.ok.should.be.equal(1)
          response.result.n.should.be.equal(1)
          done()
        })
      })
    })

    it('Should return error if userId is null', (done) => {
      User.removeById(null, (err, response) => {
        err.message.should.be.equal('userId is required')
        done()
      })
    })


  })

})
