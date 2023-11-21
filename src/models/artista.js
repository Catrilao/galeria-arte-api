import pool from '../database/connection.js'
import artistaSql from '../schemas/sql/artista.js'
import artistaNoSql from '../schemas/nosql/artista.js'

export class Consultas {
  static async getArtistas ({ dbType }) {
    try {
      if (dbType === 'sql') {
        const artistas = await artistaSql.findAll()
        return artistas
      } else if (dbType === 'nosql') {
        const artistas = await artistaNoSql.find({}).exec()
        return artistas
      }
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async createArtista ({ dbType, datosArtista }) {
    try {
      if (dbType === 'sql') {
        const artista = await artistaSql.create(datosArtista)
        return artista
      } else if (dbType === 'nosql') {
        const artista = await artistaNoSql.create(datosArtista)
        return artista
      }
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getArtistaById ({ dbType, id }) {
    try {
      if (dbType === 'sql') {
        const artista = await artistaSql.findByPk(id)
        return artista
      } else if (dbType === 'nosql') {
        const artista = await artistaNoSql.findById(id).exec()
        return artista
      }
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getObrasArtista () {
    try {
      const [datos] = await pool.query(`
        SELECT a.id_artista, a.nombre_artista, o.titulo, o.anio_creacion, o.precio, i.ruta
          FROM artista a
          JOIN artista_obra ao ON a.id_artista = ao.id_artista
          JOIN obra o ON o.id_obra = ao.id_obra
          JOIN imagen i ON i.id_imagen = o.id_obra;`
      )
      return datos
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }
}
