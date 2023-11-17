export class ArtistasController {
  constructor ({ Consultas }) {
    this.Consultas = Consultas
  }

  getArtistas = async (req, res) => {
    const artistas = await this.Consultas.getArtistas({ dbType: req.params.dbType })

    if (artistas) return res.json(artistas)

    res.status(500).send('Error interno del servidor')
  }

  createArtista = async (req, res) => {
    const artista = await this.Consultas.createArtista({ dbType: req.params.dbType, datosArtista: req.body })

    if (artista) return res.status(201).json(artista)

    res.status(500).send('Error al crear el usuario')
  }
}
