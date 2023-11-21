import mongoose from 'mongoose'
import dbConfig from '../constants/constants.js'

mongoose.connect(dbConfig.DATABASE_URI, {
}).catch((error) => {
  console.error('Error al conectar la base de datos MongoDB:', error)
  throw new Error('Error al conectar la base de datos MongoDB')
})

const connection = mongoose.connection

connection.once('open', () => {
  console.log('Conectado correctamente a la base de datos MongoDB')
})
