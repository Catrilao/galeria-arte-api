import dbConfig from './constants/constants.js'
import app from './app.js'

const PORT = dbConfig.RUN_PORT || 5000

app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`))
