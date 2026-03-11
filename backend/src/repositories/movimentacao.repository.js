import prisma from '../prisma.js';

const criar = async (dados) => {
  return prisma.movimentacaoEstoque.create({
    data: dados,
    include: { produto: true },
  });
};

const buscarTodos = async () => {
  return prisma.movimentacaoEstoque.findMany({
    include: { produto: true },
    orderBy: { criadoEm: 'desc' },
  });
};

export default { criar, buscarTodos };
