import produtoLocalService from '../services/produtoLocal.service.js';

const criar = async (req, res) => {
  const produto = await produtoLocalService.criar(req.body);
  res.status(201).json(produto);
};

const listar = async (req, res) => {
  const produtos = await produtoLocalService.buscarTodos();
  res.json(produtos);
};

const buscarUm = async (req, res) => {
  const produto = await produtoLocalService.buscarPorId(parseInt(req.params.id));
  res.json(produto);
};

const atualizar = async (req, res) => {
  const produto = await produtoLocalService.atualizar(parseInt(req.params.id), req.body);
  res.json(produto);
};

export default { criar, listar, buscarUm, atualizar };