import pedidoService from '../services/pedido.service.js';

const criar = async (req, res) => {
  const pedido = await pedidoService.criar(req.body);
  res.status(201).json(pedido);
};

const buscarUm = async (req, res) => {
  const pedido = await pedidoService.buscarPorId(parseInt(req.params.id));
  res.json(pedido);
};

const atualizarStatus = async (req, res) => {
  const pedido = await pedidoService.atualizarStatus(
    parseInt(req.params.id),
    req.body.status
  );
  res.json(pedido);
};

export default { criar, buscarUm, atualizarStatus };