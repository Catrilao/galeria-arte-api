import { Sequelize } from 'sequelize'
import sequelize from '../../database/connection-sequelize.js'
import Artista from './artista.js'
import { Obra } from './obra.js'

const ArtistaObra = sequelize.define('artista_obra', {
  id_artista: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  id_obra: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
}, { timestamps: false, freezeTableName: true })

Artista.belongsToMany(Obra, { through: 'artista_obra', foreignKey: 'id_artista' })
Obra.belongsToMany(Artista, { through: 'artista_obra', foreignKey: 'id_obra' })

export { Artista, Obra, ArtistaObra }
