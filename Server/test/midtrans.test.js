const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User } = require('../models')
// const axios = jest.fn();
const axios = require('axios')

let access_token = null


beforeAll(async function(done){
  try {

    const user = await User.findOne({where: {username: "MakmurJaya"}})

    access_token = jwt.sign({id: user.id, username: user.username}, process.env.KEY)

    done()
     
  } catch 
  (error) {
    done(error)
  }
})

jest.mock('axios')

describe("GET MIDTRANS", function(){
  //CREATE suggestion
  // {snapToken : snapToken.data.token}
  const resp = {
    data:{
      token : "25e9ff63-88ed-442f-ba97-50f914dd375e"
    }
  }
  
  axios.mockResolvedValue(resp)

  it("POST /villagers - 201 OK", function(done) {

  request(app)
    .get("/midtrans?amount=10000&category=Iuran&note=3bulan&title=Iuran joko &username=fadhoo")
    .set({ access_token })
    .end(function(err,res){
      if(err) {
        done(err)
      } 
      else {
          expect(res.statusCode).toEqual(201)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("snapToken")
          expect(typeof res.body.snapToken).toEqual("string")
          done()
        }
      })
  })
})
