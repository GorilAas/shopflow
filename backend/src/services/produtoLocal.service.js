import movimentacaoRepository from '../repositories/movimentacao.repository.js';
import produtoLocalRepository from '../repositories/produtoLocal.repository.js';

const validar = ({ nome, descricao, preco, estoque }) => {
  if (!nome || !descricao || preco == null || estoque == null) {
    throw new Error('Campos obrigatórios: nome, descricao, preco, estoque');
  }
  if (preco < 0) {
    throw new Error('Preço não pode ser negativo');
  }
  if (estoque < 0) {
    throw new Error('Estoque não pode ser negativo');
  }
};

const criar = async (dados) => {
  validar(dados);
  const produto = await produtoLocalRepository.criar(dados);

  if (dados.estoque > 0) {
    await movimentacaoRepository.criar({
      tipo: 'ENTRADA',
      quantidade: dados.estoque,
      motivo: 'Estoque inicial',
      produtoId: produto.id,
    });
  }

  return produto;
};

const buscarTodos = async () => {
  return produtoLocalRepository.buscarTodos();
};

const buscarPorId = async (id) => {
  const produto = await produtoLocalRepository.buscarPorId(id);
  if (!produto) {
    throw new Error('Produto não encontrado');
  }
  return produto;
};

const atualizar = async (id, dados) => {
  const produtoAtual = await buscarPorId(id);

  if (dados.estoque !== undefined && dados.estoque !== produtoAtual.estoque) {
    const diferenca = dados.estoque - produtoAtual.estoque;
    const tipo = diferenca > 0 ? 'ENTRADA' : 'SAIDA';
    
    await movimentacaoRepository.criar({
      tipo,
      quantidade: Math.abs(diferenca),
      motivo: 'Ajuste manual de estoque',
      produtoId: id,
    });
  }

  return produtoLocalRepository.atualizar(id, dados);
};

export default { criar, buscarTodos, buscarPorId, atualizar };