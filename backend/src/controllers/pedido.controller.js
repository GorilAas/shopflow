import pedidoService from '../services/pedido.service.js';

const criar = async (req, res) => {
  const pedido = await pedidoService.criar(req.body);
  res.status(201).json(pedido);
};

const listar = async (req, res) => {
  const pedidos = await pedidoService.buscarTodos();
  res.json(pedidos);
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

const atualizar = async (req, res) => {
  const pedido = await pedidoService.atualizar(parseInt(req.params.id), req.body);
  res.json(pedido);
};

const deletar = async (req, res) => {
  await pedidoService.deletar(parseInt(req.params.id));
  res.status(204).end();
};

export default { criar, listar, buscarUm, atualizarStatus, atualizar, deletar };