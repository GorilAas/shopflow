import movimentacaoRepository from '../repositories/movimentacao.repository.js';
import produtoLocalRepository from '../repositories/produtoLocal.repository.js';

const TIPOS_VALIDOS = ['ENTRADA', 'SAIDA'];

const criar = async (dados) => {
  if (!TIPOS_VALIDOS.includes(dados.tipo.toUpperCase())) {
    throw new Error('Tipo invalido. Use: ENTRADA ou SAIDA');
  }

  const produto = await produtoLocalRepository.buscarPorId(dados.produtoId);
  if (!produto) {
    throw new Error('Produto nao encontrado');
  }

  const tipo = dados.tipo.toUpperCase();

  if (tipo === 'SAIDA' && produto.estoque < dados.quantidade) {
    throw new Error('Estoque insuficiente para essa saida');
  }

  const novoEstoque = tipo === 'ENTRADA'
    ? produto.estoque + dados.quantidade
    : produto.estoque - dados.quantidade;

  await produtoLocalRepository.atualizar(dados.produtoId, { estoque: novoEstoque });

  return movimentacaoRepository.criar({
    tipo,
    quantidade: dados.quantidade,
    motivo: dados.motivo,
    produtoId: dados.produtoId,
  });
};

const buscarTodos = async () => {
  return movimentacaoRepository.buscarTodos();
};

export default { criar, buscarTodos };
