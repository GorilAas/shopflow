import pedidoRepository from '../repositories/pedido.repository.js';
import anuncioRepository from '../repositories/anuncio.repository.js';

const FORMAS_DE_PAGAMENTO = ['PIX', 'CARTAO', 'BOLETO'];

const validar = ({ nomeCliente, email, endereco, formaPagamento, itens }) => {
  if (!nomeCliente || !email || !endereco || !formaPagamento || !itens) {
    throw new Error('Todos os campos são obrigatórios');
  }

  if (!FORMAS_DE_PAGAMENTO.includes(formaPagamento.toUpperCase())) {
    throw new Error('Forma de pagamento inválida. Use: PIX, CARTAO ou BOLETO');
  }
};

const criar = async (dados) => {
  validar(dados);

  const ItemComDados = await Promise.all(dados.itens.map(async (item) => {
    const anuncio = await anuncioRepository.buscarPorProdutoExterno(item.produtoExternoId);
    if (!anuncio) {
      throw new Error(`Produto ${item.produtoExternoId} não possui anúncio cadastrado`);
    }
    if (!anuncio.produtoLocal) {
      throw new Error(`Anúncio ${anuncio.id} não está vinculado a um produto local`);
    }
    if (anuncio.produtoLocal.estoque < item.quantidade) {
      throw new Error(`Estoque insuficiente para o produto ${anuncio.produtoLocal.nome}`);
    }
    return {
      produtoId: anuncio.produtoLocal.id,
      nomeProduto: anuncio.produtoLocal.nome,
      precoUnit: anuncio.produtoLocal.preco,
      quantidade: item.quantidade,
    };
  }));

  const pedido = await pedidoRepository.criar({ ...dados, itens: ItemComDados });
  return { numeroPedido:pedido.numeroPedido };
};

const buscarTodos = async () => {
  return pedidoRepository.buscarTodos();
};

const buscarPorId = async (id) => {
  const pedido = await pedidoRepository.buscarPorId(id);
  if (!pedido) {
    throw new Error('Pedido não encontrado');
  }
  return pedido;
};

const STATUS_VALIDOS = ['PENDENTE', 'PAGO', 'ENVIADO'];

const atualizarStatus = async (id, status) => {
  if (!STATUS_VALIDOS.includes(status.toUpperCase())) {
    throw new Error('Status inválido. Use: PENDENTE, PAGO ou ENVIADO');
  }
  const pedido = await pedidoRepository.buscarPorId(id);
  if (!pedido) {
    throw new Error('Pedido não encontrado');
  }
  return pedidoRepository.atualizarStatus(id, status.toUpperCase());
};

const atualizar = async (id, dados) => {
  await buscarPorId(id);
  return pedidoRepository.atualizar(id, dados);
};

const deletar = async (id) => {
  await buscarPorId(id);
  return pedidoRepository.deletar(id);
};

export default { criar, buscarTodos, buscarPorId, atualizarStatus, atualizar, deletar };