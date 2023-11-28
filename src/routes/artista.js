import { Router } from 'express'
import { Controller } from '../controllers/artista.js'
import { Consultas } from '../models/artista.js'
import jwt from 'jsonwebtoken'
import dbConfig from '../constants/constants.js'

const router = Router({ mergeParams: true })
const consultasArtista = new Controller({ Consultas })

// Rutas artistas
router.route('/')
  .get(consultasArtista.getArtistas)
  .post(consultasArtista.createArtista)

router.get('/:id', (req, res, next) => {
  if (req.params.id === 'misObras') {
    next('route')
  } else {
    next()
  }
}, consultasArtista.getArtistaById)

// Rutas obras
router.route('/:id/obras')
  .get(consultasArtista.getObras)
  .post(consultasArtista.addObra)

const secret = dbConfig.JWT_SECRET
router.post('/login', async (req, res) => {
  try {
    console.log({ datosArtista: req.body })
    const artista = await consultasArtista.login({ dbType: req.params.dbType, datosArtista: req.body })
    console.log({ artista })

    if (artista === null) return res.status(404).json({ message: 'artista no existe' })

    if (!artista) return res.status(401).json({ message: 'Credenciales incorrectas' })

    const token = jwt.sign({ id: artista }, secret)
    return res.status(200).json({ token, id: artista })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ message: 'Ha ocurrido un error' })
  }
})

router.get('/misObras/:id', async (req, res) => {
  try {
    const datos = await consultasArtista.getMisObras({ dbType: req.params.dbType, id: req.params.id })

    if (datos.length === 0) return res.status(404).json({ message: 'No hay datos' })

    return res.status(200).json(datos)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Ha ocurrido un error' })
  }
})

export default router
