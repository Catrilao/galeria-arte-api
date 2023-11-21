import { Sequelize } from 'sequelize'
import sequelize from '../../database/connection-sequelize.js'

const Imagen = sequelize.define('Imagen', {
  id_imagen: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  ruta: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id_obra: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'imagen',
  timestamps: false
})

export default Imagen
