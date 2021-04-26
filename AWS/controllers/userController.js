const { User, Village } = require('../models/')
const { comparePassword } = require('../helpers/useBcrypt')
const { generateToken } = require('../helpers/useJwt')
class UserController {

  static async login(req, res, next) {
    const { username, password, push_token } = req.body
    try {
      const user = await User.findOne({ where: { username } })

      if (user) {
        const isPassword = comparePassword( password, user.password )
        
        if (isPassword) {
          await User.update({ push_token }, { where: { username } })
          
          const token = generateToken({ id: user.id, username: user.username })

          res.status(200).json(token)
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

  static async getUser(req, res, next) {
    const { id } = req.currentUser
    try {
      const user = await User.findByPk(id)
      delete user.dataValues.password
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async register(req, res, next) {
    const { name, username, password, invitation_code } = req.body
    try {
      const role = 'member'

      const village = await Village.findOne({ where: { invitation_code }})

      if (village) {
        const user = await User.create({ name, username, password, role, VillageId: village.id })

        res.status(201).json(user)
      } else {
        next({ code: 404, message: 'Cannot Found Village' })
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteUser(req, res, next) {
    const { id } = req.params

    try {
      await User.destroy({ where: { id } })

      res.status(200).json({ message: "Successfully deleted user" })
    } catch (error) {
      next(error)      
    }
  }
}

module.exports = UserController
