const request = require('supertest')
const app = require('../app')

describe('TESTING /users/register', () => {
  let userMember = { name: "Purwiro", username: "Purwiro2", password: "123asd", invitation_code: "smktl", push_token: "xaxsxa"}

  it('Should return reponse with status code 201', function(done) {

    request(app)
      .post('/user/register')
      .send(userMember)
      .end(function(err, res) {
        if (err) done(err)
        else {
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty("id")
          expect(typeof res.body.id).toEqual("number")
          expect(res.body).toHaveProperty("name")
          expect(typeof res.body.name).toEqual("string")
          expect(res.body).toHaveProperty("username")
          expect(typeof res.body.username).toEqual("string")
          expect(res.body).toHaveProperty("role")
          expect(typeof res.body.role).toEqual("string")
          expect(res.body).toHaveProperty("VillageId")
          expect(typeof res.body.VillageId).toEqual("number")
          done()
        }
      })
  })

  it('Should return reponse with status code 400', function(done) {
    let {name, username, password, invitation_code } = userMember

    let data = { name, username, password : '', invitation_code }

    request(app)
      .post(`/user/register`)
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
    let {name, username, password, invitation_code } = userMember

    let data = { name, username : '', password, invitation_code }

      request(app)
        .post(`/user/register`)
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

  it('Should return reponse with status code 404', function(done) {
    let {name, username, password, invitation_code } = userMember

    let data = { name, username, password, invitation_code: ''} 

      request(app)
        .post(`/user/register`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty("message")
            expect(typeof res.body.message).toEqual("string")
            done()
          }
        })
  })
  it('Should return reponse with status code 401', function(done) {
    let { name, username, password, invitation_code } = userMember

    let data = { name: '', username, password, invitation_code} 

      request(app)
        .post(`/user/register`)
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
