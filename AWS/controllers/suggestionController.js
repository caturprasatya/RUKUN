const { Suggestion, Village, User } = require('../models')
class SuggestionConroller {
  static async fetchSuggestions(req, res, next){
    try {
      const { VillageId } = req.currentUser
      const villageSuggestions = await Village.findOne({where : { id : VillageId}, 
      include: {
        model: Suggestion,
        separate: true,
        order: [['createdAt', 'DESC']],
        include: User
    }
  })
    
      res.status(200).json(villageSuggestions)
    } catch (error) {
      next(error)
    }
  }

  static async addSuggestion(req, res, next){
    const { title, description, type } = req.body
    const { id, VillageId } = req.currentUser

    try {
      const suggestion = await Suggestion.create({title, description, type, UserId: id, VillageId})
      
      res.status(201).json(suggestion)
    } catch (error) {
      next(error)
    }
  }
  
  static async deleteSuggestion(req, res, next){
    const { id } = req.params

    try {
      await Suggestion.destroy({ where : { id }, returning : true })

      res.status(200).json({ message: 'Suggestion has been successfully deleted.'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = SuggestionConroller
