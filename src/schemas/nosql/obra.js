import { Schema, model } from 'mongoose'

const Obra = new Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion_obra: {
    type: String,
    required: false
  },
  estilo: {
    type: String,
    required: false
  },
  tecnica: {
    type: String,
    required: false
  },
  anio_creacion: {
    type: Number,
    required: false
  },
  dimensiones: {
    type: String,
    required: false
  },
  precio: {
    type: Number,
    required: false
  },
  disponibilidad: {
    type: Boolean,
    required: false
  },
  imagenes: {
    type: [String],
    required: false
  },
  artista: {
    type: [String],
    required: false
  }
}, {
  tableName: 'obra',
  timestamps: false
})

export default model('Obra', Obra)
