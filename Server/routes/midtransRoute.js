
const route = require('express').Router()
const { Transaction, Village, User } = require('../models')
const axios = require('axios')

route.get('/', async (req,res,next)=>{
  const { title, amount, category, note, username } = req.query
  const { id, VillageId } = req.currentUser

  try {
    const { balance } = await Village.findByPk(VillageId)
    const newBalance = +balance + +amount
    await Village.update({ balance: newBalance }, { where: { id: VillageId }})
    const dataCreate = await Transaction.create({ title, amount, category, note, type: "income", VillageId, UserId: id, status:"paid" })
    
    const snapToken = await axios({
      // Below is the API URL endpoint
      url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from("SB-Mid-server-FvpTFy-JcmtG9Bw5tS4rW-1E").toString("base64")
        // Above is API server key for the Midtrans account, encoded to base64
      },
      data:
        // Below is the HTTP request body in JSON
        {
          transaction_details: {
            order_id: "order-csb-"+dataCreate.id,
            gross_amount: amount
          },
          credit_card: {
            secure: true
          },
          customer_details: {
            first_name: username
          }
        }
      })
      res.status(201).json({snapToken : snapToken.data.token})
      return snapToken
      // res.render('index.ejs',{snapToken : snapToken.data.token});

    } catch (error) {
      next(error)
    }
    // res.sendFile(path.join(__dirname + '/midtrans/index.html'));
  })

module.exports = route
