const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User } = require('../models')

let access_token = null
let another_token = null

beforeAll(async function(done){
  try {
    const user = await User.findOne({where: {username: "Rendro"}})
    
    const anotherUser = await User.findOne({where: {username: "Makarya"}})
    
    access_token = jwt.sign({ id: user.id, username: user.username }, process.env.KEY)

    another_token = jwt.sign({ id: anotherUser.id, username: anotherUser.username }, process.env.KEY)
  
    done()
     
  } catch (error) {
    done(error)
  }
})
//! SCOPE FOR SUCCESS TRANSACTON
describe("SUCCESS /transactions", function(){
  //CREATE Product
  it("POST /transactions - 201 OK", function(done) {
    const body = {
      title: "Iuran Sampah",
      amount: 10,
      category: "iuran",
      note: "iuran sampah bulanan",
      type: "income",
      status: 'panding'
    }
    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(body)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("id")
          expect(typeof res.body.id).toEqual("number")
          expect(res.body).toHaveProperty("title")
          expect(typeof res.body.title).toEqual("string")
          expect(res.body).toHaveProperty("amount")
          expect(typeof res.body.amount).toEqual("number")
          expect(res.body).toHaveProperty("category")
          expect(typeof res.body.category).toEqual("string")
          expect(res.body).toHaveProperty("note")
          expect(typeof res.body.note).toEqual("string")
          expect(res.body).toHaveProperty("type")
          expect(typeof res.body.type).toEqual("string")
          expect(res.body).toHaveProperty("type")
          expect(typeof res.body.status).toEqual("string")
          done()
        }
    })
  })
  //*FETCH TRANSACTION
  it("GET /transactions - 200 OK", function(done) {
  
    request(app)
      .get("/transactions")
      .set({ access_token })
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(200)
          expect(Array.isArray(res.body.Transactions)).toEqual(true)
          expect(res.body.Transactions[0]).toHaveProperty("id")
          expect(typeof res.body.Transactions[0].id).toEqual("number")
          expect(res.body.Transactions[0]).toHaveProperty("title")
          expect(typeof res.body.Transactions[0].title).toEqual("string")
          expect(res.body.Transactions[0]).toHaveProperty("amount")
          expect(typeof res.body.Transactions[0].amount).toEqual("number")
          expect(res.body.Transactions[0]).toHaveProperty("category")
          expect(typeof res.body.Transactions[0].category).toEqual("string")
          expect(res.body.Transactions[0]).toHaveProperty("note")
          expect(typeof res.body.Transactions[0].note).toEqual("string")
          expect(res.body.Transactions[0]).toHaveProperty("type")
          expect(typeof res.body.Transactions[0].type).toEqual("string")

          done()
        }
    })
  })
  
  // GET TRANSACTION USER
  it("GET /transactions/user - 200 OK", function(done) {
 
    request(app)
      .get("/transactions/user")
      .set({ access_token })
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(200)
          expect(Array.isArray(res.body)).toEqual(true)
          expect(res.body[0]).toHaveProperty("id")
          expect(typeof res.body[0].id).toEqual("number")
          expect(res.body[0]).toHaveProperty("title")
          expect(typeof res.body[0].title).toEqual("string")
          expect(res.body[0]).toHaveProperty("amount")
          expect(typeof res.body[0].amount).toEqual("number")
          expect(res.body[0]).toHaveProperty("category")
          expect(typeof res.body[0].category).toEqual("string")
          expect(res.body[0]).toHaveProperty("note")
          expect(typeof res.body[0].note).toEqual("string")
          expect(res.body[0]).toHaveProperty("type")
          expect(typeof res.body[0].type).toEqual("string")
          done()
        }
    })
  })
})

//! SCOPE FOR ERROR 
describe("ERROR POST /transactions", function(){
  //Suggestion Data Type not Valid  
  it("POST /transactions - 400 ERROR (Data Type not Valid)", function(done) {
    const errorBody = {
      title: "Pak Bowo",
      amount: 10,
      category: "iuran",
      note: "iuran sampah bulanan",
      type: "xsaxas"
    }

    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
      .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(typeof res.body.message).toEqual("string")
          expect(res.body.message).toEqual("Invalid Data Type Payment")

          done()
        }
      })
  })

  //Suggestion Data Type not Valid  
  it("POST /transactions - 400 ERROR (Data Type not Valid)", function(done) {
    const errorBody = {
      title: "Pak Bowo",
      amount: 0,
      category: "iuran",
      note: "iuran sampah bulanan",
      type: "income"
    }

    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
      .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(typeof res.body.message).toEqual("string")
          expect(res.body.message).toEqual("Invalid Input Payment")

          done()
        }
      })
  })

  //Suggestion Title Empty
  it("POST /transactions - 400 ERROR (Title empty)", function(done) {
    const errorBody = {
      title: "",
      amount: 10,
      category: "iuran",
      note: "iuran sampah bulanan",
      type: "income"
    }

    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
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

  //Suggestion Amount not Float
  it("POST /transactions - 400 ERROR (Amount not Float)", function(done) {
    const errorBody = {
      title: "Iuran Bulanan",
      amount: "RP.10000",
      category: "iuran",
      note: "iuran sampah bulanan",
      type: "income"
    }
    
    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
      .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(500)
          expect(typeof res.body.message).toEqual('string')
          expect(typeof res.body.message).toEqual("string")
          expect(res.body.message).toEqual(`invalid input syntax for type integer: "NaN"`)
          done()
        }
      })
  })

  //Suggestion Category Empty
  it("POST /transactions - 400 ERROR (Category Empty)", function(done) {
    const errorBody = {
      title: "Iuran Bulanan",
      amount: 100000,
      category: "",
      note: "iuran sampah bulanan",
      type: "income"
    }
    
    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
      .end(function(err,res){
        if(err) {
          done(err)
        } else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body.message)).toEqual(true)
          expect(typeof res.body.message[0]).toEqual("string")
          expect(res.body.message[0]).toEqual("Category is required")
          done()
        }
      })
  })

  //Suggestion Notes Empty
  it("POST /transactions - 400 ERROR (Note Empty)", function(done) {
    const errorBody = {
      title: "Iuran Bulanan",
      amount: 100000,
      category: "iuran",
      note: "",
      type: "income"
    }
    
    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
      .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(400)
          expect(Array.isArray(res.body.message)).toEqual(true)
          expect(typeof res.body.message[0]).toEqual("string")
          expect(res.body.message[0]).toEqual("Note is required")
          done()
        }
      })
  })

  //Suggestion Type Empty
  it("POST /transactions - 400 ERROR (Type Empty)", function(done) {
    const errorBody = {
      title: "Iuran Bulanan",
      amount: 100000,
      category: "iuran",
      note: "iuran sampah bulanan",
      type: ""
    }
    
    request(app)
      .post("/transactions")
      .set({ access_token })
      .send(errorBody)
      .end(function(err,res){
        if(err) done(err)
        else {
          expect(res.statusCode).toEqual(400)
          expect(typeof res.body).toEqual('object')
          expect(typeof res.body.message).toEqual("string")
          expect(res.body.message).toEqual("Invalid Data Type Payment")
          done()
        }
      })
  })
})

