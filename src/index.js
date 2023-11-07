import CONFIGURACION_BD from './constants/constants.js'
import app from './app.js'

const PORT = CONFIGURACION_BD.RUN_PORT || 5000

app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`))
