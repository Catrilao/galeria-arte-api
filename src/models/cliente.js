import { compareSync } from 'bcrypt'
import ClienteSql from '../schemas/sql/cliente.js'
import ClienteNoSql from '../schemas/nosql/cliente.js'

export class Consultas {
  static async getClientes ({ dbType }) {
    try {
      if (dbType === 'sql') {
        const clientes = await ClienteSql.findAll()
        return clientes
      } else if (dbType === 'nosql') {
        const clientes = await ClienteNoSql.find({}).exec()
        return clientes
      }
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async createCliente ({ dbType, datosCliente }) {
    try {
      if (dbType === 'sql') {
        const cliente = await ClienteSql.create(datosCliente)
        return cliente
      } else if (dbType === 'nosql') {
        const cliente = await ClienteNoSql.create(datosCliente)
        return cliente
      }
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async getCliente ({ dbType, datosCliente }) {
    try {
      let cliente
      if (dbType === 'sql') {
        cliente = await ClienteSql.findOne({ where: datosCliente })
      } else if (dbType === 'nosql') {
        cliente = await ClienteNoSql.findOne(datosCliente).exec()
      }

      if (!cliente || cliente.password !== datosCliente.password) return null

      return cliente
    } catch (error) {
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }

  static async login ({ dbType, datosCliente }) {
    try {
      let cliente
      if (dbType === 'sql') {
        cliente = await ClienteSql.findOne({ where: { correo_cliente: datosCliente.correo_cliente } })
      } else if (dbType === 'nosql') {
        cliente = await ClienteNoSql.findOne({ correo_cliente: datosCliente.correo_cliente }).exec()
      }

      // Cliente no existe
      if (!cliente) return null

      // Credenciales incorrectas
      if (!(compareSync(datosCliente.contrasenia_cliente, cliente.contrasenia_cliente))) return false

      // Cliente existe y credenciales correctas
      return cliente
    } catch (error) {
      console.error('Error details:', error)
      throw new Error('Error al ejecutar la consulta:', error)
    }
  }
}
