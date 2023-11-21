import mysql from 'mysql2/promise'
import dbConfig from '../constants/constants.js'

const DEFAULT_CONFIG = {
  host: dbConfig.HOST,
  user: dbConfig.USER,
  database: dbConfig.DATABASE,
  password: dbConfig.PASSWORD
}

let connectionString
if (dbConfig.DB_ENV === 'local') {
  connectionString = DEFAULT_CONFIG
} else if (dbConfig.DB_ENV === 'remote') {
  connectionString = 'mysql://u10tc13a5hv7u6vk0wvf:pscale_pw_Q9uCpB8XufVimXrcbIFdrm5LULVpCWXiI6BN1SUpAhz@aws.connect.psdb.cloud/galeria_arte?ssl={"rejectUnauthorized":true}'
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
    console.error('Error al conectar a la base de datos:', error)
  })

export default pool
