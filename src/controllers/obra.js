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
    console.log('Controller 1', { req })
    console.log('Controller 1', { body: req.body })
    const obra = await this.Consultas.createObra({ dbType: req.params.dbType, datosObra: req.body })

    if (obra) return res.status(201).json(obra)

    res.status(500).send('Error al crear el usuario')
  }

  getImagenes = async (req, res) => {
    const imagenes = await this.Consultas.getImagenes({ dbType: req.params.dbType, id: req.params.id })

    if (imagenes) return res.json(imagenes)

    res.status(500).send('Error interno del servidor')
  }

  getImagenById = async (req, res) => {
    const imagen = await this.Consultas.getImagenById({ dbType: req.params.dbType, id: req.params.id, idImagen: req.params.idImagen })

    if (imagen) return res.json(imagen)

    res.status(500).send('Error interno del servidor')
  }

  addImagen = async (req, res) => {
    const imagen = await this.Consultas.addImagen({ dbType: req.params.dbType, id: req.params.id, ruta: req.body.ruta })

    if (imagen) return res.status(201).json(imagen)

    res.status(500).send('Error al agregar imagen')
  }

  getArtistas = async (req, res) => {
    const artistas = await this.Consultas.getArtistas({ dbType: req.params.dbType, id: req.params.id })

    if (artistas) return res.json(artistas)

    res.status(500).send('Error interno del servidor')
  }

  addArtista = async (req, res) => {
    const artista = await this.Consultas.addArtista({ dbType: req.params.dbType, idObra: req.params.id, idArtista: req.body.idArtista })

    if (artista) return res.status(201).json(artista)

    res.status(500).send('Error al agregar artista')
  }
}
