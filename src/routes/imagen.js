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

export default router
