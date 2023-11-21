import { Router } from 'express'
import { Controller } from '../controllers/artista.js'
import { Consultas } from '../models/artista.js'

const router = Router({ mergeParams: true })
const consultasArtista = new Controller({ Consultas })

router.route('/')
  .get(consultasArtista.getArtistas)
  .post(consultasArtista.createArtista)

router.get('/:id', consultasArtista.getArtistaById)

export default router
