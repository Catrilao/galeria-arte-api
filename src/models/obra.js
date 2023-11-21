import obraSql from '../schemas/sql/obra.js'
import obraNoSql from '../schemas/nosql/obra.js'

export class Consultas {
  static async getObras ({ dbType }) {
    try {
      if (dbType === 'sql') {
        const obras = await obraSql.findAll()
        return obras
      } else if (dbType === 'nosql') {
        const obras = await obraNoSql.find({}).exec()
        return obras
      }
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getObraById ({ dbType, id }) {
    try {
      if (dbType === 'sql') {
        const obra = await obraSql.findByPk(id)
        return obra
      } else if (dbType === 'nosql') {
        const obra = await obraNoSql.findById(id).exec()
        return obra
      }
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async createObra ({ dbType, datosObra }) {
    try {
      if (dbType === 'sql') {
        const obra = await obraSql.create(datosObra)
        return obra
      } else if (dbType === 'nosql') {
        const obra = await obraNoSql.create(datosObra)
        return obra
      }
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }
}
