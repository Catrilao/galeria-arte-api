import { Router } from 'express'
import { Controller } from '../controllers/artista.js'
import { Consultas } from '../models/artista.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import dbConfig from '../constants/constants.js'

const router = Router({ mergeParams: true })
const consultasArtista = new Controller({ Consultas })

// Rutas artistas
router.route('/')
  .get(consultasArtista.getArtistas)
  .post(consultasArtista.createArtista)

router.get('/:id', consultasArtista.getArtistaById)

// Rutas obras
router.route('/:id/obras')
  .get(consultasArtista.getObras)
  .post(consultasArtista.addObra)

const secret = dbConfig.JWT_SECRET
router.post('/login', async (req, res) => {
  console.log('Router', { dbType: req.params.dbType })
  try {
    const artista = await consultasArtista.login({ dbType: req.params.dbType, datosArtista: req.body })

    if (artista === null) return res.status(404).json({ message: 'artista no existe' })

    if (!artista) return res.status(401).json({ message: 'Credenciales incorrectas' })

    const token = jwt.sign({ id: artista.id_cliente }, secret)
    return res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Ha ocurrido un error' })
  }
})

router.use(expressjwt({ secret, algorithms: ['HS256'] }))

export default router
