import 'dotenv/config'

const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_URI = process.env.DATABASE_URI

const HOST = process.env.HOST
const USER = process.env.USER
const DATABASE = process.env.DATABASE
const PASSWORD = process.env.PASSWORD

const RUN_PORT = process.env.RUN_PORT

const DB_ENV = process.env.DB_ENV

const dbConfig = {
  DATABASE_URL,
  DATABASE_URI,
  HOST,
  USER,
  DATABASE,
  PASSWORD,
  RUN_PORT,
  DB_ENV
}

Object.freeze(dbConfig)

export default dbConfig
