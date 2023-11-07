import { Router } from 'express'
import { ConsultasController } from '../controllers/consultasController.js'
import { Consultas } from '../models/mysql.js'

const router = Router()
const consultasController = new ConsultasController({ Consultas })

router.get('/clientes', consultasController.getClientes)
router.get('/artistas', consultasController.getArtistas)
router.get('/obras', consultasController.getObras)
router.get('/obrasArtista', consultasController.getObrasArtista)
router.get('/imagenes/:id', consultasController.getImagenes)
router.get('/clientes/:id', consultasController.getClienteId)

router.post('/clientes', consultasController.createCliente)
router.post('/artistas', consultasController.createArtista)

router.get('/consulta1', consultasController.getConsulta1)
router.get('/consulta2', consultasController.getConsulta2)
router.get('/consulta3', consultasController.getConsulta3)
router.get('/consulta4', consultasController.getConsulta4)
router.get('/consulta5', consultasController.getConsulta5)
router.get('/consulta6', consultasController.getConsulta6)
router.get('/consulta7', consultasController.getConsulta7)
router.get('/consulta8', consultasController.getConsulta8)
router.get('/consulta9', consultasController.getConsulta9)

export default router
