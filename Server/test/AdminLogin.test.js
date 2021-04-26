const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

let access_token_member = null

let access_token_admin = null

let id = null

beforeAll(async function(done){
  try {
    const dataAdmin = await User.findOne({where: {username: "Makarya"}})

    const dataMember = await User.findOne({where: {username: "MakmurJaya"}})

    id = dataMember.id

    access_token_admin = jwt.sign({id: dataAdmin.id, username: dataAdmin.username}, process.env.KEY)

    access_token_member = jwt.sign({id: dataMember.id, username: dataMember.username}, process.env.KEY)

    done()
     
  } catch 
  (error) {
    done(error)
  }
})

//!POST SUCCESS
describe('TESTING /users/register', () => {
  let userAdmin = { username: "Rendro", password: "123456" }

  it('Should return reponse with status code 200', function(done) {

    request(app)
      .post('/admin/login')
      .send(userAdmin)
      .end(function(err, res) {
        if (err) done(err)
        else {
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("string")
          done()
        }
      })
  })

  it('Should return reponse with status code 404', function(done) {
    let {username, password} = userAdmin

    let data = {username, password : 'xsaxas'}

    request(app)
      .post(`/admin/login`)
      .send(data)
      .end(function(err, res) {
        if (err) done(err)
        else {
          expect(res.statusCode).toEqual(404)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(typeof res.body.message).toEqual("string")
          done()
          }
      })
  })

  it('Should return reponse with status code 404', function(done) {
    let {username, password } = userAdmin

    let data = {username : 'sabana', password}

      request(app)
        .post(`/admin/login`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(404)
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("message")
            expect(typeof res.body.message).toEqual("string")
            done()
          }
        })
  })

  it('Should return reponse with status code 500', function(done) {
      let data = {} 

      request(app)
        .post(`/admin/login`)
        .send(data)
        .end(function(err, res) {
          if (err) done(err)
          else {
            expect(res.statusCode).toEqual(500)
            expect(typeof res.body).toEqual("object")
            expect(res.body).toHaveProperty("message")
            expect(typeof res.body.message).toEqual("string")
            done()
          }
        })
  })

})
