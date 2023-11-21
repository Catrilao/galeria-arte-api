import 'dotenv/config'

const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_URI = process.env.DATABASE_URI

const HOST = process.env.HOST
const USER = process.env.USER
const DATABASE = process.env.DATABASE
const PASSWORD = process.env.PASSWORD

const RUN_PORT = process.env.RUN_PORT
const ORIGENES_PERMITIDOS = process.env.ORIGENES_PERMITIDOS

const NODE_ENV = process.env.NODE_ENV
const DB_ENV = process.env.DB_ENV

const dbConfig = {
  DATABASE_URL,
  DATABASE_URI,
  HOST,
  USER,
  DATABASE,
  PASSWORD,
  RUN_PORT,
  ORIGENES_PERMITIDOS,
  NODE_ENV,
  DB_ENV
}

Object.freeze(dbConfig)

export default dbConfig
