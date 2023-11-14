import mysql from 'mysql2/promise'
import dbConfig from '../constants/constants.js'

const DEFAULT_CONFIG = {
  host: dbConfig.HOST,
  user: dbConfig.USER,
  database: dbConfig.DATABASE,
  password: dbConfig.PASSWORD,
}

let connectionString;
if (dbConfig.DB_ENV === 'local') {
  connectionString = DEFAULT_CONFIG
} else if (dbConfig.DB_ENV === 'remote') {
  connectionString = dbConfig.DATABASE_URL
} else {
  throw new Error('No se ha especificado un entorno de base de datos válido')
}

const pool = mysql.createPool(connectionString)

// Probamos la conexión
pool.getConnection()
  .then(conection => {
    console.log('Conectado correctamente a la base de datos')
    conection.release()
  })
  .catch(error => {
    console.log('Error al conectar a la base de datos')
    console.log(error)
  })

export default pool
