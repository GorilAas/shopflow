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

const buscarTodos = async () => {
  return prisma.pedido.findMany({
    include: { itensPedido: true, historicos: true },
    orderBy: { criadoEm: 'desc' },
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

const atualizar = async (id, dados) => {
  return prisma.pedido.update({
    where: { id },
    data: dados,
    include: { itensPedido: true, historicos: true },
  });
};

const deletar = async (id) => {
  return prisma.pedido.delete({ where: { id } });
};

export default { criar, buscarTodos, buscarPorId, atualizarStatus, atualizar, deletar };