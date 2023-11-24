import Sequelize from 'sequelize'
import dbConfig from '../constants/constants.js'

let sequelize
if (dbConfig.DB_ENV === 'local') {
  sequelize = new Sequelize(
    dbConfig.DATABASE,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
      host: dbConfig.HOST,
      dialect: 'mysql'
    }
  )
} else if (dbConfig.DB_ENV === 'remote') {
  const url = new URL(dbConfig.DATABASE_URL)
  sequelize = new Sequelize(
    url.pathname.substring(1),
    url.username,
    url.password,
    {
      host: url.hostname,
      dialect: 'mysql',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  )
} else {
  throw new Error('No se ha especificado un entorno de base de datos válido')
}

sequelize.authenticate()
  .then(() => {
    console.log('Conectado correctamente a la base de datos MySQL con Sequelize')
  })
  .catch((error) => {
    console.error('Error al conectar la base de datos MySQL a través de Sequelize:', error)
  })

export default sequelize
