import prisma from '../prisma.js';

const criar = async ({ nomeCliente, email, endereco, formaPagamento, itens }) => {
  return prisma.pedido.create({
    data: {
      nomeCliente,
      email,
      endereco,
      formaPagamento,
      historicos: {
        create: { status: 'PENDENTE' },
      },
      itensPedido: {
        create: itens.map((item) => ({
          produtoId: item.produtoId,
          nomeProduto: item.nomeProduto,
          precoUnit: item.precoUnit,
          quantidade: item.quantidade,
        })),
      },
    },
    include: { historicos: true, itensPedido: true },
  });
};

const buscarPorId = async (id) => {
  return prisma.pedido.findUnique({
    where: { id },
    include: { itensPedido: true, historicos: true },
  });
};

const atualizarStatus = async (id, status) => {
  return prisma.pedido.update({
    where: { id },
    data: {
      status,
      historicos: { create: { status } },
    },
    include: { historicos: true, itensPedido: true },
  });
};

export default { criar, buscarPorId, atualizarStatus };