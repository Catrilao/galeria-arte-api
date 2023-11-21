import cors from 'cors'
import dbConfig from '../constants/constants.js'

const corsOptions = {
  credentials: true,
  optionSuccessStatus: 200,
  methods: 'GET, PUT, POST, DELETE',
  origin: dbConfig.ORIGENES_PERMITIDOS || '*'
}

export default cors(corsOptions)
