import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'
import { hashSync } from 'bcrypt'

const Artista = new Schema({
  id_artista: {
    type: String,
    required: true,
    maxlength: 36,
    default: randomUUID()
  },
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
    required: false,
    maxLenght: 9
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
  }
})

export default model('Artista', Artista)
