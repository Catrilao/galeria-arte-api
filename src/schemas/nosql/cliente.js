import { Schema, model } from 'mongoose'
import { hashSync } from 'bcrypt'

const Cliente = new Schema({
  nombre_cliente: {
    type: String,
    required: false,
    maxLenght: 100
  },
  correo_cliente: {
    type: String,
    required: false,
    maxLenght: 100
  },
  contrasenia_cliente: {
    type: String,
    required: false,
    maxLenght: 100,
    set: password => hashSync(password, 10)
  }
})

export default model('Cliente', Cliente)
