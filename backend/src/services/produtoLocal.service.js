import produtoLocalRepository from '../repositories/produtoLocal.repository.js';

const validar = ({ nome, descricao, preco, estoque }) => {
  if (!nome || !descricao || preco == null || estoque == null) {
    throw new Error('Campos obrigatórios: nome, descricao, preco, estoque');
  }
  if (preco < 0) throw new Error('Preço não pode ser negativo');
  if (estoque < 0) throw new Error('Estoque não pode ser negativo');
};

const criar = async (dados) => {
  validar(dados);
  return produtoLocalRepository.criar(dados);
};

const buscarTodos = async () => {
  return produtoLocalRepository.buscarTodos();
};

const buscarPorId = async (id) => {
  const produto = await produtoLocalRepository.buscarPorId(id);
  if (!produto) throw new Error('Produto não encontrado');
  return produto;
};

const atualizar = async (id, dados) => {
  await buscarPorId(id);
  return produtoLocalRepository.atualizar(id, dados);
};

export default { criar, buscarTodos, buscarPorId, atualizar };