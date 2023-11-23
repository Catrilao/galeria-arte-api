import { hashSync } from 'bcrypt'
import Sequelize from 'sequelize'
import sequelize from '../../database/connection-sequelize.js'

const Cliente = sequelize.define('Cliente', {
  id_cliente: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4
  },
  nombre_cliente: {
    type: Sequelize.STRING,
    allowNull: false
  },
  correo_cliente: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  contrasenia_cliente: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'cliente',
  timestamps: false,
  hooks: {
    beforeCreate: (cliente) => {
      cliente.contrasenia_cliente = hashSync(cliente.contrasenia_cliente, 10)
    }
  }
})

export default Cliente
