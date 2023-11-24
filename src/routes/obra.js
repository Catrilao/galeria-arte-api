import { Router } from 'express'
import { ObrasController } from '../controllers/obra.js'
import { Consultas } from '../models/obra.js'

const router = Router({ mergeParams: true })
const consultas = new ObrasController({ Consultas })

// Rutas para obras
router.route('/')
  .get(consultas.getObras)
  .post(consultas.createObra)

router.get('/:id', consultas.getObraById)

// Rutas imagenes
router.route('/:id/imagenes')
  .get(consultas.getImagenes)
  .post(consultas.addImagen)

router.get('/:id/imagenes/:idImagen', consultas.getImagenById)

// Rutas artistas
router.route('/:id/artistas')
  .get(consultas.getArtistas)
  .post(consultas.addArtista)

export default router
