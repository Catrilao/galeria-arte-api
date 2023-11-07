import 'dotenv/config'

const DATABASE_URL = process.env.DATABASE_URL

const HOST = process.env.HOST
const USER = process.env.USER
const DATABASE = process.env.DATABASE
const PASSWORD = process.env.PASSWORD

const RUN_PORT = process.env.RUN_PORT

const CONFIGURACION_BD = {
  DATABASE_URL,
  HOST,
  USER,
  DATABASE,
  PASSWORD,
  RUN_PORT
}

Object.freeze(CONFIGURACION_BD)

export default CONFIGURACION_BD
