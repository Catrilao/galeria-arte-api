export class ConsultasController {
  constructor ({ Consultas }) {
    this.Consultas = Consultas
  }

  getClientes = async (_, res) => {
    const clientes = await this.Consultas.getClientes()
    if (clientes) return res.json(clientes)

    res.status(500).send('Error interno del servidor')
  }

  getClienteId = async (req, res) => {
    const clientes = await this.Consultas.getClienteId({ id: req.params.id })
    if (clientes) return res.json(clientes)

    res.status(500).send('Error interno del servidor')
  }

  getArtistas = async (_, res) => {
    const artistas = await this.Consultas.getArtistas()
    if (artistas) return res.json(artistas)

    res.status(500).send('Error interno del servidor')
  }

  getObras = async (_, res) => {
    const obras = await this.Consultas.getObras()

    if (obras) return res.json(obras)

    res.status(500).send('Error interno del servidor')
  }

  // TODO agregar id_obra a la consulta
  getImagenes = async (req, res) => {
    const id = req.params.id
    const imagenes = await this.Consultas.getImagenes({ id })

    if (imagenes) return res.json(imagenes)

    res.status(500).send('Error interno del servidor')
  }

  getObrasArtista = async (_, res) => {
    const datos = await this.Consultas.getObrasArtista()

    if (datos) return res.json(datos)

    res.status(500).send('Error interno del servidor')
  }

  createCliente = async (req, res) => {
    const cliente = await this.Consultas.createCliente({ datosCliente: req.body })

    if (cliente) return res.status(201).json(cliente)

    res.status(500).send('Error al crear el usuario')
  }

  createArtista = async (req, res) => {
    const artista = await this.Consultas.createArtista({ datosArtista: req.body })

    if (artista) return res.status(201).json(artista)

    res.status(500).send('Error al crear el usuario')
  }

  getConsulta1 = async (_, res) => {
    const datos = await this.Consultas.consulta1()

    if (datos) return res.json(datos)

    res.status(500).send('Error interno del servidor')
  }

  getConsulta2 = async (_, res) => {
    const datos = await this.Consultas.consulta2()

    if (datos) return res.json(datos)

    res.status(500).send('Error interno del servidor')
  }

  getConsulta3 = async (_, res) => {
    const datos = await this.Consultas.consulta3()

    if (datos) return res.json(datos)

    res.status(500).send('Error interno del servidor')
  }

  getConsulta4 = async (_, res) => {
    const datos = await this.Consultas.consulta4()

    if (datos) return res.json(datos)

    res.status(500).send('Error interno del servidor')
  }

  getConsulta5 = async (_, res) => {
    const datos = await this.Consultas.consulta5()

    if (datos) return res.json(datos)

    res.status(500).send('Error interno del servidor')
  }

  getConsulta6 = async (_, res) => {
    const datos = await this.Consultas.consulta6()

    if (datos) return res.json(datos)

    res.status(500).send('Error interno del servidor')
  }

  getConsulta7 = async (_, res) => {
    const datos = await this.Consultas.consulta7()

    if (datos) return res.json(datos)

    res.status(500).send('Error interno del servidor')
  }

  getConsulta8 = async (_, res) => {
    const datos = await this.Consultas.consulta8()

    if (datos) return res.json(datos)

    res.status(500).send('Error interno del servidor')
  }

  getConsulta9 = async (_, res) => {
    const datos = await this.Consultas.consulta9()

    if (datos) return res.json(datos)

    res.status(500).send('Error interno del servidor')
  }
}
