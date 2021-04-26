const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User } = require('../models')

let access_token = null
let another_token = null
const body = {
  title: "Ga Setuju Beli Kursi",
  description:"Karena kursi digudang sudah ada"
}
let id

beforeAll(async function (done){
  try {
    const data = await User.findOne({where: {username: "MakmurJaya"}})
    
    access_token = jwt.sign({id: data.id, username: data.username}, process.env.KEY)

    const user = await User.findOne({where: {username: "Rendro"}})
    
    another_token = jwt.sign({ id: user.id, username: user.username }, process.env.KEY)

    done() 
  } catch (error) {
    done(error)
  }
})

  //! SCOPE SUGGESTIONS SUCCESS
describe("SUCCESS /suggestions", function(){
  //CREATE suggestion
  it("POST /suggestions - 201 OK", function(done) {

  request(app)
    .post("/suggestions")
    .set({ access_token })
    .send(body)
    .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("id")
          expect(typeof res.body.id).toEqual("number")
          expect(res.body).toHaveProperty("title", body.title)
          expect(typeof res.body.title).toEqual("string")
          expect(res.body).toHaveProperty("description", body.description)
          expect(typeof res.body.description).toEqual("string")
          id = res.body.id
          done()
        }
      })
  })

  //READ Suggestion
  it("GET /suggestions - 200 OK", function(done) { 
    
    request(app)
      .get("/suggestions")
      .set({ access_token })
      .end(function(err, res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(200)
          expect(Array.isArray(res.body.Suggestions)).toEqual(true)
          expect(typeof res.body.Suggestions[0]).toEqual("object")
          expect(res.body.Suggestions[0]).toHaveProperty("id")
          expect(typeof res.body.Suggestions[0].id).toEqual("number")
          expect(res.body.Suggestions[0]).toHaveProperty("title")
          expect(typeof res.body.Suggestions[0].title).toEqual("string")
          expect(res.body.Suggestions[0]).toHaveProperty("description")
          expect(typeof res.body.Suggestions[0].description).toEqual("string")
          done()
        }
      })
  })

  
  //! SUGGESTION ERROR
  describe("ERROR POST /suggestions", function(){
    //Suggestion Title Empty
    it("POST /suggestions - 400 ERROR (Title empty)", function(done) {
      const errBody = {
        title: "",
        description:"Sampah banyak tersendat di selokan",
      }
      
      request(app)
        .post("/suggestions")
        .set({ access_token })
        .send(errBody)
        .end(function(err,res){
          if(err) done(err)
          else {
            expect(res.statusCode).toEqual(400)
            expect(Array.isArray(res.body.message)).toEqual(true)
            expect(typeof res.body.message[0]).toEqual("string")
            expect(res.body.message[0]).toEqual("Title is required")
            done()
          }
        })
    })
    
    //Suggestion Description Empty
    it("POST /suggestions - 400 ERROR (Description empty)", function(done) {
    const errBody = {
      title: "iuran",
      description: "",
    }
    
    request(app)
      .post("/suggestions")
      .set({ access_token })
      .send(errBody)
      .end(function(err,res){
        if(err) done(err)
        else {          
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body.message)).toEqual(true)
          expect(typeof res.body.message[0]).toEqual("string")
          expect(res.body.message[0]).toEqual("Description is required")
          done()
        }
      })
    })
  })
})

//!SCOPE FOR DELETE SUGGESTION
describe(`DELETE /suggestions`, function(){
  //DELETE suggestions
  it(`DELETE /suggestions/${id} - 200 OK`, function(done) {

    request(app)
      .delete(`/suggestions/${id}`)
      .set({ access_token })
      .end(function(err, res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(200)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual("Suggestion has been successfully deleted.")

          done()
        }
      })
  })

  //Suggestion Not User's
  it("DELETE /suggestions/1 - 401 ERROR (Unauthorized)", function(done) {

    request(app)
      .delete(`/suggestions/${id+1}`)
      .set({ access_token })
      .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(404)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual("Suggestion Not Found")

          done()
        }
      })
  })

  //Suggestion Not User's
  it("DELETE /suggestions/1 - 401 ERROR (Unauthorized)", function(done) {

    request(app)
      .delete(`/suggestions/qwe`)
      .set({ access_token })
      .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(500)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("message")
          expect(res.body.message).toEqual(`invalid input syntax for type integer: "qwe"`)
        
          done()
        }
      })
  })
})
