export class ObrasController {
  constructor ({ Consultas }) {
    this.Consultas = Consultas
  }

  getObras = async (req, res) => {
    const obras = await this.Consultas.getObras({ dbType: req.params.dbType })

    if (obras) return res.json(obras)

    res.status(500).send('Error interno del servidor')
  }

  getObraById = async (req, res) => {
    const obras = await this.Consultas.getObraById({ dbType: req.params.dbType, id: req.params.id })

    if (obras) return res.json(obras)

    res.status(500).send('Error interno del servidor')
  }

  createObra = async (req, res) => {
    const obra = await this.Consultas.createObra({ dbType: req.params.dbType, datosObra: req.body })

    if (obra) return res.status(201).json(obra)

    res.status(500).send('Error al crear el usuario')
  }
}
