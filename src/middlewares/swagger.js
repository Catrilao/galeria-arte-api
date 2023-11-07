import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const ruta = '../docs/openapi.yaml'
const swaggerDocument = YAML.load(path.join(dirname(fileURLToPath(import.meta.url)), ruta))

const swagger = (app) => {
  app.use('/docs-api', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
}

export default swagger
