import cors from 'cors'

const corsOptions = {
  credentials: true,
  optionSuccessStatus: 200,
  methods: 'GET, PUT, POST, DELETE',
  origin: '*'
}

export default cors(corsOptions)
