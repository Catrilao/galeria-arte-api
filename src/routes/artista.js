import { Router } from 'express'
import { ArtistasController } from '../controllers/artista.js'
import { Consultas as Artista } from '../models/artista.js'

const router = Router()
const consultaPrueba = new ArtistasController({ Consultas: Artista })

router.route('/:dbType')
  .get(consultaPrueba.getArtistas)
  .post(consultaPrueba.createArtista)

export default router
