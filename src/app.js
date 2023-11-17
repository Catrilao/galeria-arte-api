import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import router from './routes/Router.js'
import routerArtista from './routes/artista.js'
import cors from './middlewares/cors.js'
import swagger from './middlewares/swagger.js'

const app = express()

swagger(app)
app.use(cors)
app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(router)
app.use('/artistas', routerArtista)

export default app
