import produtoService from '../services/produto.service.js';

const listar = async (req, res) => {
  const { limite, pagina } = req.query;
  const produtos = await produtoService.buscarTodos({ limite, pagina });
  res.json(produtos);
};

const buscarUm = async (req, res) => {
  const produto = await produtoService.buscarPorId(req.params.id);
  res.json(produto);
};

export default { listar, buscarUm };

