import mongoose from 'mongoose'
import dbConfig from '../constants/constants.js'

const DATABASE_URI = 'mongodb+srv://angel:<password>@cluster0.jfol89s.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DATABASE_URI, {
}).catch((error) => {
  console.error('Error al conectar la base de datos MongoDB:', error)
  throw new Error('Error al conectar la base de datos MongoDB')
})

const connection = mongoose.connection

connection.once('open', () => {
  console.log('Conectado correctamente a la base de datos MongoDB')
})
