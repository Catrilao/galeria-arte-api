import dbConfig from './constants/constants.js'
import app from './app.js'

const PORT = dbConfig.RUN_PORT || 5000

const server = app.listen(PORT, () => {
  const host = server.address().address
  const port = server.address().port
  console.log(`Servidor funcionando en https://${host}:${port}`)
})
