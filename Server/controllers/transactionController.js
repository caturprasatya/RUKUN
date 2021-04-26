const { Transaction, Village, User } = require('../models')

class TransactionController { 

  static async fetchTransactions(req, res, next) {
    try {
      const { VillageId } = req.currentUser

      const village = await Village.findOne({where : { id : VillageId }, include: {
        model: Transaction,
        separate: true,
        order: [['createdAt', 'DESC']],
        include: User
    }})
      res.status(200).json(village)
    } catch (error) {
      next(error)
    }
  }

  static async fetchTransactionsUser(req, res, next) {
    try {
      const { id, VillageId } = req.currentUser

      const transactions = await Transaction.findAll({ 
        where: { UserId: id, VillageId },
        order: [['id', 'DESC']]
      })
      
      res.status(200).json(transactions)
    } catch (error) {
      next(error)
    }
  }

  static async addTransaction(req, res, next) {
    const { title, amount, category, note, type, status } = req.body
    const { id, VillageId } = req.currentUser
    
    try {
      if(+amount === 0){
        next({
          code: 400,
          message: 'Invalid Input Payment'
        })
      }
      if (type === 'expanse') {
        const { balance } = await Village.findByPk(VillageId)
        const newBalance = balance - +amount

        await Village.update({ balance: newBalance }, { where: { id: VillageId }})

        const dataCreate = await Transaction.create({ title, amount, category, note, type, VillageId, UserId: id, status })    
        res.status(201).json(dataCreate)
      } else if(type === 'income') {
        const { balance } = await Village.findByPk(VillageId)
        const newBalance = +balance + +amount

        await Village.update({ balance: newBalance }, { where: { id: VillageId }})

        const dataCreate = await Transaction.create({ title, amount, category, note, type, VillageId, UserId: id, status })
        res.status(201).json(dataCreate)
      } else {
        next({
          code: 400,
          message: 'Invalid Data Type Payment'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController
