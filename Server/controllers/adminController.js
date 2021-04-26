const { User, Village } = require('../models')
const { comparePassword } = require('../helpers/useBcrypt')
const { generateToken } = require('../helpers/useJwt')
const createToken = require('../helpers/useToken')


class AdminController {

  static async registerAdmin(req, res, next) {
    const { name, username, password, nameVillage, location, balance } = req.body
    
    try {
        const role = 'admin'
        const invitation_code = createToken()
        const user = await User.create({ name, username, password, role })
        
        const village = await Village.create({ name: nameVillage, location, invitation_code, balance, UserId: user.id})

        await User.update({ VillageId: village.id } ,{ where: { id: user.id }})

        res.status(201).json({ message: 'Success Crete User and Village', invitation_code})
    } catch (error) {
      if (Array.isArray(error)) {
        next({ name : 'SequelizeValidationError', errors: error })
      } else {
        next(error)
      }
    }
  }

  static async loginAdmin(req, res, next) {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ where: { username }})
        
        if (user) {
          const isPassword = comparePassword( password, user.password )
          
          if (isPassword && user.role === 'admin') {
            const access_token = generateToken({ id: user.id, username: user.username })
            
            res.status(200).json(access_token)
          } else {
            next({ code: 404, message: "Invalid Username/Password" })
          }
        } else {
          next({ code: 404, message: "Invalid Username/Password" })
        }
      } catch (error) {
        next(error)
      }
    }

  static async changeAdmin(req, res, next) {
    const { id } = req.params
    const { VillageId, id : AdminId } = req.currentUser

    try {
      await Village.update({ UserId: id }, { where: { id: VillageId }})

      await User.update({ role: 'admin' }, { where: { id }})

      await User.update({ role: 'member' }, { where: { id: AdminId }})
      
      res.status(200).json({ message: "Successfully change role admin" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminController
