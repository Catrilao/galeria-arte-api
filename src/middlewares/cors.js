import cors from 'cors'
import dbConfig from '../constants/constants.js'

const corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET, PUT, POST, DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: dbConfig.ORIGENES_PERMITIDOS || '*'
}

export default cors(corsOptions)
