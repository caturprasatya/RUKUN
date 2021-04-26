module.exports = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
    const errors = err.errors.map(err => err.message)
    res.status(400).json({ message: errors })
  } else if( err.name === 'JsonWebTokenError'){
    res.status(400).json({ message: 'Invalid Token' })
  }else if(err.code === 400){
    res.status(400).json({message: err.message})
  } else if(err.code === 401){
    res.status(401).json({message: err.message})
  } else if(err.code === 402) {
    res.status(402).json({message: err.message})
  } else if(err.code === 404) {
    res.status(404).json({message: err.message})
  } else {
    res.status(500).json({message: err.message})
  }
}
