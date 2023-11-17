import { randomUUID } from 'crypto'
import pool from '../database/connection.js'
import hash from '../utils/hash.js'

export class Consultas {
  constructor (dbType) {
    this.dbType = dbType
  }

  static async getClientes () {
    try {
      const [clientes] = await pool.query('SELECT * FROM cliente;')
      return clientes
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getClienteId ({ id }) {
    try {
      const [cliente] = await pool.query(`SELECT * FROM cliente WHERE id_cliente = ${id};`)
      return cliente
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getArtistas () {
    try {
      const [artistas] = await pool.query('SELECT * FROM artista;')
      return artistas
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getObras () {
    try {
      const [obras] = await pool.query('SELECT * FROM obra;')
      return obras
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  // TODO agregar id_obra a la consulta
  static async getImagenes ({ id }) {
    try {
      const [imagenes] = await pool.query(
        'SELECT * FROM imagen WHERE id_obra = ?;',
        [id]
      )
      return imagenes
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

  static async createCliente ({ datosCliente }) {
    const id = randomUUID()
    const { nombre, correo, contrasenia } = datosCliente
    const hashedPassword = await hash(contrasenia)

    try {
      await pool.query(
        'INSERT INTO cliente (id_cliente, nombre_cliente, correo_cliente, contrasenia_cliente) VALUES (?, ?, ?, ?);',
        [id, nombre, correo, hashedPassword]
      )

      const [cliente] = await pool.query(`SELECT * FROM cliente WHERE id_cliente = '${id}';`)
      return cliente
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async createArtista ({ datosArtista }) {
    const id = randomUUID()
    const { nombre, correo, telefono, biografia, nacionalidad, imagen, contrasenia } = datosArtista

    const hashedPassword = await hash(contrasenia)

    try {
      await pool.query(
        'INSERT INTO artista (id_artista, nombre_artista, correo_artista, telefono, biografia, nacionalidad, imagen, contrasenia_artista) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [id, nombre, correo, telefono, biografia, nacionalidad, imagen, hashedPassword]
      )

      const [artista] = await pool.query(`SELECT * FROM artista WHERE id_artista = '${id}';`)
      return artista
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async consulta1 () {
    try {
      const [datos] = await pool.query(`
      SELECT o.titulo, o.descripcion_obra, g.nombre_galeria
        FROM obra o
        JOIN obra_en_galeria og ON o.id_obra = og.id_obra
        JOIN galeria g ON g.id_galeria = og.id_galeria
        WHERE g.nombre_galeria = 'Exposición de Van Gogh' AND o.disponibilidad = 1;`
      )
      return datos
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async consulta2 () {
    try {
      const [datos] = await pool.query(`
        SELECT a.nombre_artista, COUNT(o.id_obra) as total_obras
          FROM artista a
          JOIN artista_obra ao ON a.id_artista = ao.id_artista
          JOIN obra o ON ao.id_obra = o.id_obra
          GROUP BY a.nombre_artista
          HAVING COUNT(o.id_obra) > 0;`
      )
      return datos
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async consulta3 () {
    try {
      const [datos] = await pool.query(`
        SELECT g.nombre_galeria, AVG(o.precio) as precio_promedio
          FROM galeria g
          JOIN obra_en_galeria og ON g.id_galeria = og.id_galeria
          JOIN obra o ON o.id_obra = og.id_obra
          GROUP BY g.nombre_galeria
          HAVING AVG(o.precio) > 5000000;`
      )
      return datos
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async consulta4 () {
    try {
      const [datos] = await pool.query(`
        SELECT a.nombre_artista, COUNT(o.id_obra) as total_obras
          FROM artista a
          LEFT JOIN artista_obra ao ON a.id_artista = ao.id_artista
          LEFT JOIN obra o ON ao.id_obra = o.id_obra
          GROUP BY a.nombre_artista
          ORDER BY total_obras DESC;`
      )
      return datos
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async consulta5 () {
    try {
      const [datos] = await pool.query(`
        SELECT a.nombre_artista, MAX(o.anio_creacion) as anio_maximo
          FROM artista a
          JOIN artista_obra ao ON a.id_artista = ao.id_artista
          JOIN obra o ON ao.id_obra = o.id_obra
          GROUP BY a.nombre_artista;`
      )
      return datos
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async consulta6 () {
    try {
      const [datos] = await pool.query(`
        SELECT g.nombre_galeria, COUNT(o.id_obra) as total_obras
          FROM galeria g
          LEFT JOIN obra_en_galeria og ON g.id_galeria = og.id_galeria
          LEFT JOIN obra o ON o.id_obra = og.id_obra
          GROUP BY g.nombre_galeria;`
      )
      return datos
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async consulta7 () {
    try {
      const [datos] = await pool.query(`
        SELECT a.nombre_artista, AVG(o.precio) as precio_promedio
          FROM artista a
          JOIN artista_obra ao ON a.id_artista = ao.id_artista
          JOIN obra o ON o.id_obra = ao.id_obra
          GROUP BY a.nombre_artista
          HAVING AVG(o.precio) < 10000000;`
      )
      return datos
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async consulta8 () {
    try {
      const [datos] = await pool.query(`
        SELECT a.nombre_artista, COUNT(o.id_obra) as total_obras
          FROM artista a
          JOIN artista_obra ao ON a.id_artista = ao.id_artista
          JOIN obra o ON o.id_obra = ao.id_obra
          WHERE o.disponibilidad = 1
          GROUP BY a.nombre_artista;`
      )
      return datos
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async consulta9 () {
    try {
      const [datos] = await pool.query(`
        SELECT g.nombre_galeria, MIN(o.precio) as precio_minimo
          FROM galeria g
          LEFT JOIN obra_en_galeria og ON g.id_galeria = og.id_galeria
          LEFT JOIN obra o ON o.id_obra = og.id_obra
          GROUP BY g.nombre_galeria;`
      )
      return datos
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }
}
