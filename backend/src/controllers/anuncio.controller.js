import anuncioService from '../services/anuncio.service.js';

const importar = async (req, res) => {
  const anuncio = await anuncioService.importar(parseInt(req.body.produtoExternoId));
  res.status(201).json(anuncio);
};

const listar = async (req, res) => {
  const anuncios = await anuncioService.buscarTodos();
  res.json(anuncios);
};

const buscarUm = async (req, res) => {
  const anuncio = await anuncioService.buscarPorId(parseInt(req.params.id));
  res.json(anuncio);
};

const vincularProdutoLocal = async (req, res) => {
  const idRecebido = req.body.produtoLocalId;
  const produtoLocalId = idRecebido ? parseInt(idRecebido) : null;
  
  const anuncio = await anuncioService.vincularProdutoLocal(
    parseInt(req.params.id),
    produtoLocalId
  );
  res.json(anuncio);
};

const atualizar = async (req, res) => {
  const anuncio = await anuncioService.atualizar(parseInt(req.params.id), req.body);
  res.json(anuncio);
};

const deletar = async (req, res) => {
  await anuncioService.deletar(parseInt(req.params.id));
  res.status(204).end();
};

export default { importar, listar, buscarUm, vincularProdutoLocal, atualizar, deletar };