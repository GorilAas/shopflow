import anuncioRepository from '../repositories/anuncio.repository.js';
import produtoLocalRepository from '../repositories/produtoLocal.repository.js';
import produtoService from './produto.service.js';

const importar = async (produtoExternoId) => {
  const existente = await anuncioRepository.buscarPorProdutoExterno(produtoExternoId);
  if (existente){
    throw new Error('Anúncio já importado para esse produto');
}

  const produto = await produtoService.buscarPorId(produtoExternoId);

  return anuncioRepository.criar({
    produtoExternoId: produto.id,
    nome: produto.nome,
    descricao: produto.descricao,
    preco: produto.preco,
    imagem: produto.imagem,
  });
};

const buscarTodos = async () => {
  return anuncioRepository.buscarTodos();
};

const buscarPorId = async (id) => {
  const anuncio = await anuncioRepository.buscarPorId(id);
  if (!anuncio) {
    throw new Error('Anúncio não encontrado');
  }
  return anuncio;
};

const vincularProdutoLocal = async (id, produtoLocalId) => {
  await buscarPorId(id);
  
  if (produtoLocalId) {
    const produto = await produtoLocalRepository.buscarPorId(produtoLocalId);
    if (!produto){
      throw new Error('Produto local não encontrado');
    }
  }
  
  return anuncioRepository.vincularProdutoLocal(id, produtoLocalId);
};

const atualizar = async (id, dados) => {
  await buscarPorId(id);
  return anuncioRepository.atualizar(id, dados);
};

const deletar = async (id) => {
  await buscarPorId(id);
  return anuncioRepository.deletar(id);
};

export default { importar, buscarTodos, buscarPorId, vincularProdutoLocal, atualizar, deletar };