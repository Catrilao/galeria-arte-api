import { Sequelize } from 'sequelize'
import sequelize from '../../database/connection-sequelize.js'

const Obra = sequelize.define('Obra', {
  id_obra: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descripcion_obra: {
    type: Sequelize.STRING,
    allowNull: false
  },
  estilo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tecnica: {
    type: Sequelize.STRING,
    allowNull: false
  },
  anio_creacion: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dimensiones: {
    type: Sequelize.STRING,
    allowNull: false
  },
  precio: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  disponibilidad: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'obra',
  timestamps: false
})

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

Obra.hasMany(Imagen, { foreignKey: 'id_obra' })
Imagen.belongsTo(Obra, { foreignKey: 'id_obra' })

export { Obra, Imagen }
