import movimentacaoService from '../services/movimentacao.service.js';

const criar = async (req, res) => {
  const movimentacao = await movimentacaoService.criar(req.body);
  res.status(201).json(movimentacao);
};

const listar = async (req, res) => {
  const movimentacoes = await movimentacaoService.buscarTodos();
  res.json(movimentacoes);
};

export default { criar, listar };
