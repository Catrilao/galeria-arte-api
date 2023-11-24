import { Imagen } from '../schemas/sql/obra.js'
import { Obra as ObraSql } from '../schemas/sql/artista_obra.js'
import ObraNoSql from '../schemas/nosql/obra.js'

export class Consultas {
  static async getObras ({ dbType }) {
    try {
      if (dbType === 'sql') {
        const obras = await ObraSql.findAll()
        return obras
      } else if (dbType === 'nosql') {
        const obras = await ObraNoSql.find({}).exec()
        return obras
      }
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getObraById ({ dbType, id }) {
    try {
      if (dbType === 'sql') {
        const obra = await ObraSql.findByPk(id)
        return obra
      } else if (dbType === 'nosql') {
        const obra = await ObraNoSql.findById(id).exec()
        return obra
      }
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async createObra ({ dbType, datosObra }) {
    try {
      if (dbType === 'sql') {
        const obra = await ObraSql.create(datosObra)
        return obra
      } else if (dbType === 'nosql') {
        const obra = await ObraNoSql.create(datosObra)
        return obra
      }
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getImagenes ({ dbType, id }) {
    try {
      if (dbType === 'sql') {
        const imagenes = await Imagen.findAll({ where: { id_obra: id } })
        return imagenes
      } else if (dbType === 'nosql') {
        const obra = await ObraNoSql.findById(id).exec()
        return obra.imagenes
      }
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getImagenById ({ dbType, id, idImagen }) {
    try {
      if (dbType === 'sql') {
        const imagen = await Imagen.findOne({ where: { id_obra: id, id_imagen: idImagen } })
        return imagen
      } else if (dbType === 'nosql') {
        const obra = await ObraNoSql.findById(id).exec()
        return obra.imagenes.at(idImagen)
      }
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async addImagen ({ dbType, id, ruta }) {
    try {
      if (dbType === 'sql') {
        await Imagen.create({ ruta, id_obra: id })
        return true
      } else if (dbType === 'nosql') {
        await ObraNoSql.findByIdAndUpdate(id, { $push: { imagenes: ruta } }, { new: true })
        return true
      }
      return false
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getArtistas ({ dbType, id }) {
    try {
      if (dbType === 'sql') {
        const obra = await ObraSql.findByPk(id)
        return await obra.getArtista()
      } else if (dbType === 'nosql') {
        const obra = await ObraNoSql.findById(id).exec()
        return obra.artistas
      }
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async addArtista ({ dbType, idObra, idArtista }) {
    try {
      if (dbType === 'sql') {
        const obra = await ObraSql.findByPk(idObra)
        await obra.addArtista(idArtista)
        return true
      } else if (dbType === 'nosql') {
        await ObraNoSql.findByIdAndUpdate(idObra, { $push: { artistas: idArtista } }, { new: true })
        return true
      }
      return false
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }
}
