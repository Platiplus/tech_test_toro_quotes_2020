/* eslint-env mocha */
require('dotenv').config()
// UTILS AND MODELS
const Database = require('../utils/Database')
const Utils = require('../utils/Utils')
const User = require('../api/models/user-model').model
const mongoose = require('mongoose')

// DEV DEPENDENCIES
const casual = require('casual')
const chai = require('chai')
const expect = chai.expect
const dirtyChai = require('dirty-chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const util = new Utils()

// MIDDLEWARES
chai.use(chaiHttp)
chai.use(dirtyChai)

// USER RELATED TESTS
describe('User', () => {
  const mockUser = {
    username: casual.username,
    password: casual.password
  }

  let registeredUser

  before(async () => {
    const db = new Database()
    await db.connect()
    await User.deleteMany({})
  })

  describe('/POST /users/', () => {
    it('Should create an user', (done) => {
      chai.request(server)
        .post('/users/')
        .send(mockUser)
        .end((err, res) => {
          registeredUser = res.body.createdUser
          expect(err).to.be.null()
          expect(res).to.have.status(201)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('createdUser')
          expect(res.body).to.have.property('createdAccount')
          done()
        })
    })
    it('Should fail when input with missing properties is provided', (done) => {
      const entries = Object.entries(mockUser)
      let user = Object.fromEntries(entries)

      user = util.chaoticInputGenerator(user)
      chai.request(server)
        .post('/users/')
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(400)
          expect(res.error).not.to.be.null()
          done()
        })
    })
    it('it should fail when trying to create an user that already exists', (done) => {
      chai.request(server)
        .post('/users/')
        .send(mockUser)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(409)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('message').equal('User Already Exists')
          done()
        })
    })
  })
  describe('/GET /users/:id', () => {
    it('it should find a specific user', (done) => {
      chai.request(server)
        .get(`/users/${registeredUser._id}`)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body.user).to.be.an('object')
          done()
        })
    })
    it('it should fail to find an user that does not exists on the database', (done) => {
      chai.request(server)
        .get(`/users/${mongoose.Types.ObjectId()}`)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(404)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('message').equal('User not found on database')
          done()
        })
    })
    it('it should fail to find an user if ObjectId is invalid', (done) => {
      chai.request(server)
        .get('/users/invalidObjectId')
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(400)
          expect(res.error).not.to.be.null()
          done()
        })
    })
  })
  describe('/PATCH /user/:id', () => {
    it('it should patch a specific user', (done) => {
      chai.request(server)
        .patch(`/users/${registeredUser._id}`)
        .set('Authorization', 'token')
        .send({ stock: { name: 'PETR4', value: '0', quantity: 15 }, action: 'BUY' })
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('message').equal('Operation successfull')
          done()
        })
    })
    it('it should fail to patch an user that does not exists on the database', (done) => {
      chai.request(server)
        .patch(`/users/${mongoose.Types.ObjectId()}`)
        .send({ stock: { name: 'PETR4', value: '12', quantity: 15 }, action: 'SELL' })
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(404)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('message').equal('User not found on database')
          done()
        })
    })
    it('it should fail to patch an user if there are no properties on the request', (done) => {
      chai.request(server)
        .patch(`/users/${registeredUser._id}`)
        .send({})
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(400)
          expect(res.error).not.to.be.null()
          done()
        })
    })
    it('it should fail to patch an user if there are unknow properties on the request', (done) => {
      chai.request(server)
        .patch(`/users/${registeredUser._id}`)
        .send({ malicious_property: 'hackerman' })
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(400)
          expect(res.error).not.to.be.null()
          done()
        })
    })
    it('it should fail to patch if ObjectId is invalid', (done) => {
      chai.request(server)
        .patch('/users/invalidObjectId')
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(400)
          expect(res.error).not.to.be.null()
          done()
        })
    })
  })
})
