export class ClientesController {
  constructor ({ Consultas }) {
    this.Consultas = Consultas
  }

  getClientes = async (req, res) => {
    const clientes = await this.Consultas.getClientes({ dbType: req.params.dbType })

    if (clientes) return res.json(clientes)

    res.status(500).send('Error interno del servidor')
  }

  createCliente = async (req, res) => {
    const cliente = await this.Consultas.createCliente({ dbType: req.params.dbType, datosCliente: req.body })
    console.log({ Controller_cliente: req.body })

    if (cliente) return res.status(201).json(cliente)

    res.status(500).send('Error al crear el usuario')
  }

  getClienteById = async (req, res) => {
    const cliente = await this.Consultas.getCliente({ dbType: req.params.dbType, datosCliente: req.body })

    if (cliente) return res.json(cliente)

    res.status(500).send('Error interno del servidor')
  }

  login = async (dbType, datosCliente) => {
    const cliente = await this.Consultas.login(dbType, datosCliente)

    return cliente
  }
}
