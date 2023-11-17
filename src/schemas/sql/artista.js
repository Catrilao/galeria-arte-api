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
    allowNull: false
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
    allowNull: false
  },
  biografia: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nacionalidad: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imagen: {
    type: Sequelize.STRING,
    allowNull: false
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
