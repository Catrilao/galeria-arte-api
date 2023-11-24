import { expressjwt } from 'express-jwt'
import jwt from 'jsonwebtoken'
import dbConfig from '../constants/constants.js'
import { Router } from 'express'
import { ClientesController } from '../controllers/cliente.js'
import { Consultas } from '../models/cliente.js'

const secret = dbConfig.JWT_SECRET
const router = Router({ mergeParams: true })
const consultas = new ClientesController({ Consultas })

router.route('/')
  .get(consultas.getClientes)
  .post(consultas.createCliente)

router.post('/login', async (req, res) => {
  try {
    const cliente = await consultas.login({ dbType: req.params.dbType, datosCliente: req.body })

    if (cliente === null) return res.status(404).json({ message: 'Cliente no existe' })

    if (!cliente) return res.status(401).json({ message: 'Credenciales incorrectas' })

    const token = jwt.sign({ id: cliente.id_cliente }, secret)
    return res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Ha ocurrido un error' })
  }
})

router.use(expressjwt({ secret, algorithms: ['HS256'] }))

export default router
