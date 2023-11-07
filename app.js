import express, { json, urlencoded } from 'express'
import router from './routes/Router.js'
import cors from './middlewares/cors.js'
import swagger from './middlewares/swagger.js'

const app = express()

swagger(app)
app.use(cors)
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(router)

export default app
