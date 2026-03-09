import prisma from '../prisma.js';
import pedidoRepository from '../repositories/pedido.repository.js';

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
    const produto = await prisma.produtoLocal.findUnique({ where: { id: item.produtoId } });
    if (!produto) {
      throw new Error(`Produto com ID ${item.produtoId} não encontrado`);
    }
    if (produto.estoque < item.quantidade) {
      throw new Error(`Estoque insuficiente para o produto ${produto.nome}`);
    }
    return {
      produtoId: item.produtoId,
      nomeProduto: produto.nome,
      precoUnit: produto.preco,
      quantidade: item.quantidade,
    };
  }));

  const pedido = await pedidoRepository.criar({ ...dados, itens: ItemComDados });
  return { numeroPedido:pedido.numeroPedido };
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

export default { criar, buscarPorId, atualizarStatus };