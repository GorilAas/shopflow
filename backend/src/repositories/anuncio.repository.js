import prisma from '../prisma.js';

const criar = async (dados) => {
  return prisma.anuncio.create({
    data: dados,
    include: { produtoLocal: true }
  });
};

const buscarTodos = async () => {
  return prisma.anuncio.findMany({
    include: { produtoLocal: true }
  });
};

const buscarPorId = async (id) => {
  return prisma.anuncio.findUnique({
    where: { id },
    include: { produtoLocal: true }
  });
};

const buscarPorProdutoExterno = async (produtoExternoId) => {
  return prisma.anuncio.findUnique({
    where: { produtoExternoId },
    include: { produtoLocal: true }
  });
};

const vincularProdutoLocal = async (id, produtoLocalId) => {
  return prisma.anuncio.update({
    where: { id },
    data: { produtoLocalId },
    include: { produtoLocal: true }
  });
};

const atualizar = async (id, dados) => {
  return prisma.anuncio.update({
    where: { id },
    data: dados,
    include: { produtoLocal: true }
  });
};

const deletar = async (id) => {
  return prisma.anuncio.delete({ where: { id } });
};

export default { criar, buscarTodos, buscarPorId, buscarPorProdutoExterno, vincularProdutoLocal, atualizar, deletar };