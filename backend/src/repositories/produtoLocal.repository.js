import prisma from '../prisma.js';

const criar = async (dados) => {
  return prisma.produtoLocal.create({ data: dados });
};

const buscarTodos = async () => {
  return prisma.produtoLocal.findMany({ where: { ativo: true } });
};

const buscarPorId = async (id) => {
  return prisma.produtoLocal.findUnique({ where: { id } });
};

const atualizar = async (id, dados) => {
  return prisma.produtoLocal.update({ where: { id }, data: dados });
};

export default { criar, buscarTodos, buscarPorId, atualizar };