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

export default { criar, buscarTodos, buscarPorId, buscarPorProdutoExterno, vincularProdutoLocal };