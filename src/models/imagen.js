import imagenSql from '../schemas/sql/imagen.js'
import imagenNoSql from '../schemas/nosql/imagen.js'

export class Consultas {
  static async getImagenes ({ dbType }) {
    try {
      if (dbType === 'sql') {
        const obras = await imagenSql.findAll()
        return obras
      } else if (dbType === 'nosql') {
        const obras = await imagenNoSql.find({}).exec()
        return obras
      }
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getImagenById ({ dbType, id }) {
    try {
      if (dbType === 'sql') {
        const obra = await imagenSql.findByPk(id)
        return obra
      } else if (dbType === 'nosql') {
        const obra = await imagenNoSql.findById(id).exec()
        return obra
      }
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async createImagen ({ dbType, datosImagen }) {
    try {
      if (dbType === 'sql') {
        const obra = await imagenSql.create({
          id_obra: datosImagen.id_obra,
          ruta: datosImagen.ruta
        })
        return obra
      } else if (dbType === 'nosql') {
        const obra = await imagenNoSql.create(datosImagen)
        return obra
      }
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }
}
