const env = process.env.NODE_ENV || 'development'

if (env == 'development' || env =='test') {
    require('dotenv').config()
}

let capsEnv = env.toUpperCase()
  let database = {
      username : process.env["DB_USERNAME_" + capsEnv],
      password : process.env["DB_PASSWORD_" + capsEnv],
      database : process.env["DB_NAME_" + capsEnv],
      host : process.env["DB_HOST_" + capsEnv],
      dialect : process.env["DB_DIALECT_" + capsEnv],
      logging: true
  }

module.exports = {
  "development": database,
  "test": database,
  "production": {
    "use_env_variable" : "DATABASE_URL",
    "dialectOptions" : {
      "ssl": {
          "rejectUnauthorized": false
      }
    }
  }
}
