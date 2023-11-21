import { Schema, model } from 'mongoose'
import { hashSync } from 'bcrypt'

const Artista = new Schema({
  nombre_artista: {
    type: String,
    required: false,
    maxLenght: 100
  },
  correo_artista: {
    type: String,
    required: false,
    maxLenght: 100
  },
  telefono: {
    type: Number,
    required: false
  },
  biografia: {
    type: String,
    required: false,
    maxLenght: 500
  },
  nacionalidad: {
    type: String,
    required: false,
    maxLenght: 100
  },
  imagen: {
    type: String,
    required: false,
    maxLenght: 200
  },
  contrasenia_artista: {
    type: String,
    required: false,
    maxLenght: 100,
    set: password => hashSync(password, 10)
  },
  obras: {
    type: [String],
    required: false
  }
})

export default model('Artista', Artista)
