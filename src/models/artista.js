import pool from '../database/connection.js'
import { Artista as ArtistaSql } from '../schemas/sql/artista_obra.js'
import ArtistaNoSql from '../schemas/nosql/artista.js'

export class Consultas {
  static async getArtistas ({ dbType }) {
    try {
      if (dbType === 'sql') {
        const artistas = await ArtistaSql.findAll()
        return artistas
      } else if (dbType === 'nosql') {
        const artistas = await ArtistaNoSql.find({}).exec()
        return artistas
      }
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async createArtista ({ dbType, datosArtista }) {
    try {
      if (dbType === 'sql') {
        const artista = await ArtistaSql.create(datosArtista)
        return artista
      } else if (dbType === 'nosql') {
        const artista = await ArtistaNoSql.create(datosArtista)
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
        const artista = await ArtistaSql.findByPk(id)
        return artista
      } else if (dbType === 'nosql') {
        const artista = await ArtistaNoSql.findById(id).exec()
        return artista
      }
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getObras ({ dbType, id }) {
    try {
      if (dbType === 'sql') {
        const artista = await ArtistaSql.findByPk(id)
        return await artista.getObras()
      } else if (dbType === 'nosql') {
        const artista = await ArtistaNoSql.findById(id).exec()
        return artista.obras
      }
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async addObra ({ dbType, idArtista, idObra }) {
    console.log({ dbType, idArtista, idObra })
    try {
      if (dbType === 'sql') {
        const artista = await ArtistaSql.findByPk(idArtista)
        await artista.addObra(idObra)
        return true
      } else if (dbType === 'nosql') {
        await ArtistaNoSql.findByIdAndUpdate(idArtista, { $push: { obras: idObra } }, { new: true })
        return true
      }
      return false
    } catch (error) {
      console.error('Error details:', error)
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
