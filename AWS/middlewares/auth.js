const { verifyToken } = require('../helpers/useJwt')
const { User, Suggestion } = require('../models')

const authenticate = async (req, res, next) =>{
    try {
        let { access_token } = req.headers
        let decoded = verifyToken(access_token)

        if (decoded) {
            const user = await User.findOne({where: { username: decoded.username } })

            if (user) {
                req.currentUser = { id : user.id, role: user.role, VillageId: user.VillageId }
                next()
            } else {
              next({ code : 401,
                message : 'Unauthorized'
              })
            }
        } else {
          next({ code : 401,
            message : 'Invalid Token'
          })
        }
    } catch (error) {
      next(error)
    }
}

const authorize = async (req, res, next) =>{
  const { id } = req.currentUser
  const { id: SuggestionId } = req.params
  try {
    const suggestion = await Suggestion.findByPk(SuggestionId)

    if (suggestion) {
      if (suggestion.UserId === id) {
        next()
      } else {
        next({ code : 401,
          message : 'Unauthorized'
        })
      }
    } else  {
      next({code : 401,
        message : 'Unauthorized'
      })    
    }
  } catch (error) {
    next(error)
  }
}

const authorizeAdmin = async (req, res, next) =>{
  const { id } = req.currentUser
  try {
    const user = await User.findByPk(id)
    
    if (user) {
      if (user.role === 'admin') {
        next()
      } else {
        next({ code : 401,
          message : 'Unauthorized'
        })
      }
    } else  {
      next({code : 401,
        message : 'Unauthorized'
      })    
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { authenticate, authorize, authorizeAdmin }
