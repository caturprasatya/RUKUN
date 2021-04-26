const request = require('supertest')
const app = require('../app')

//!POST SUCCESS
describe('TESTING /users/register', () => {
  let userAdmin = { name: "Bambang", username: "Bambang2", password: "123456", nameVillage: "SukaJadi", location: "Jakarta", push_token: "dwadwdawd"}

  it('Should return reponse with status code 201', function(done) {

    request(app)
      .post('/admin/register')
      .send(userAdmin)
      .end(function(err, res) {
        if (err) done(err)
        else {
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(typeof res.body.message).toEqual("string")
          expect(res.body).toHaveProperty("invitation_code")
          expect(typeof res.body.invitation_code).toEqual("string")
          done()
        }
      })
  })

  it('Should return reponse with status code 400', function(done) {
      let {name, username, password, nameVillage, location, push_token } = userAdmin

      let data = { name, username, password : '', nameVillage, location, push_token }

      request(app)
        .post(`/admin/register`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(400)
            expect(Array.isArray(res.body.message)).toEqual(true)
            done()
          }
        })
  })

  it('Should return reponse with status code 400', function(done) {
    let {name, username, password, nameVillage, location } = userAdmin

    let data = { name, username : '', password, nameVillage, location }

      request(app)
        .post(`/admin/register`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(400)
            expect(Array.isArray(res.body.message)).toEqual(true)
            done()
          }
        })
  })

  it('Should return reponse with status code 400', function(done) {
    let {name, username, password, nameVillage, location } = userAdmin

    let data = { name, username, password, nameVillage, location: ''} 

      request(app)
        .post(`/admin/register`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(400)
            expect(Array.isArray(res.body.message)).toEqual(true)
            done()
          }
        })
  })
  it('Should return reponse with status code 400', function(done) {
    let {name, username, password, nameVillage, location } = userAdmin

    let data = { name, username, password, nameVillage: '', location} 

      request(app)
        .post(`/admin/register`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(400)
            expect(Array.isArray(res.body.message)).toEqual(true)
            done()
          }
        })
  })
})
