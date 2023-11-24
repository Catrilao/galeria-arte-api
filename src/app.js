import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from './middlewares/cors.js'
import swagger from './middlewares/swagger.js'
import dbConfig from './constants/constants.js'
import './database/connection.js'
import './database/connection-mongoose.js'
import './database/connection-sequelize.js'
import router from './routes/Router.js'
import routerClientes from './routes/cliente.js'
import routerArtistas from './routes/artista.js'
import routerObras from './routes/obra.js'

const app = express()

// Documentación
swagger(app)

// Middlewares
app.set('env', dbConfig.NODE_ENV)
app.use(cors)
app.use(helmet())
app.use(morgan(dbConfig.NODE_ENV === 'develoment' ? 'dev' : 'combined'))
app.use(json())
app.use(urlencoded({ extended: true }))

// Rutas
app.use(router)
app.use('/:dbType/clientes', routerClientes)
app.use('/:dbType/artistas', routerArtistas)
app.use('/:dbType/obras', routerObras)

export default app
