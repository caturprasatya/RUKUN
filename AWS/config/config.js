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
      dialect : process.env["DB_DIALECT_" + capsEnv] 
  }

module.exports = {
  "development": database,
  "test": database,
  "production": {
    "username": 'ykntypxwbhpudf',
    "password": '787df0dfcb8474ff684b9c2b94db07c9f010916025c354c79a0f34a93af4ef29',
    "database": 'd1uqkihop6895c',
    "host": 'ec2-54-220-35-19.eu-west-1.compute.amazonaws.com',
    "dialect": "postgres",
    "dialectOptions" : {
      "ssl": {
          "rejectUnauthorized": false
      }
    }
  }
}
