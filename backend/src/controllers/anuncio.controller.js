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
  const anuncio = await anuncioService.vincularProdutoLocal(
    parseInt(req.params.id),
    parseInt(req.body.produtoLocalId)
  );
  res.json(anuncio);
};

export default { importar, listar, buscarUm, vincularProdutoLocal };