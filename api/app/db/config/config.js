require('dotenv').config();
module.exports = {
  development: {
    databases: {
      // Special environment only for Database1
      database1: {
        database: process.env.DB1_DATABASE,
        username: process.env.DB1_USERNAME,
        password: process.env.DB1_PASSWORD,
        host: process.env.DB1_HOST,
        port: process.env.DB1_PORT,
        dialect:  process.env.DB_CONNECTION
      },
      // Special environment only for Database2
      database2: {
        database: process.env.DB2_DATABASE,
        username: process.env.DB2_USERNAME,
        password: process.env.DB2_PASSWORD,
        host: process.env.DB2_HOST,
        port: process.env.DB2_PORT,
        dialect: process.env.DB_CONNECTION
      }
    }
  },
  database1: {
    database: process.env.DB1_DATABASE,
    username: process.env.DB1_USERNAME,
    password: process.env.DB1_PASSWORD,
    host: process.env.DB1_HOST,
    port: process.env.DB1_PORT,
    dialect: "mysql"
  },

  // Special environment only for Database2
  database2: {
    database: process.env.DB2_DATABASE,
    username: process.env.DB2_USERNAME,
    password: process.env.DB2_PASSWORD,
    host: process.env.DB2_HOST,
    port: process.env.DB2_PORT,
    dialect: process.env.DB_CONNECTION
  }
}