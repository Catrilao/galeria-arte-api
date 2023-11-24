import Sequelize from 'sequelize'
import sequelize from '../../database/connection-sequelize.js'
import { hashSync } from 'bcrypt'

const Artista = sequelize.define('Artista', {
  id_artista: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4
  },
  nombre_artista: {
    type: Sequelize.STRING,
    allowNull: true
  },
  correo_artista: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  telefono: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  biografia: {
    type: Sequelize.STRING,
    allowNull: true
  },
  nacionalidad: {
    type: Sequelize.STRING,
    allowNull: true
  },
  imagen: {
    type: Sequelize.STRING,
    allowNull: true
  },
  contrasenia_artista: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'artista',
  timestamps: false,
  hooks: {
    beforeCreate: (artista) => {
      artista.contrasenia_artista = hashSync(artista.contrasenia_artista, 10)
    }
  }
})

export default Artista
