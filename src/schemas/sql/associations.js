import Obra from './obra.js'
import Imagen from './imagen.js'

Obra.hasMany(Imagen, { foreignKey: 'id_obra' })
Imagen.belongsTo(Obra, { foreignKey: 'id_obra' })

export { Obra, Imagen }
