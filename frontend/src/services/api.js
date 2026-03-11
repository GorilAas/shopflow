import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Produtos do marketplace (dummyjson)
export const buscarProdutos = async () => {
  const resposta = await api.get('/products');
  return resposta.data;
};

// Produtos locais
export const buscarProdutosLocais = async () => {
  const resposta = await api.get('/local-products');
  return resposta.data;
};

export const criarProdutoLocal = async (dados) => {
  const resposta = await api.post('/local-products', dados);
  return resposta.data;
};

export const atualizarProdutoLocal = async (id, dados) => {
  const resposta = await api.patch(`/local-products/${id}`, dados);
  return resposta.data;
};

// Anuncios
export const buscarAnuncios = async () => {
  const resposta = await api.get('/ads');
  return resposta.data;
};

export const importarAnuncio = async (produtoExternoId) => {
  const resposta = await api.post('/ads/importar', { produtoExternoId });
  return resposta.data;
};

export const vincularAnuncio = async (id, produtoLocalId) => {
  const resposta = await api.patch(`/ads/${id}/vincular`, { produtoLocalId });
  return resposta.data;
};

export const atualizarAnuncio = async (id, dados) => {
  const resposta = await api.patch(`/ads/${id}`, dados);
  return resposta.data;
};

export const deletarAnuncio = async (id) => {
  await api.delete(`/ads/${id}`);
};

// Pedidos
export const buscarPedidos = async () => {
  const resposta = await api.get('/orders');
  return resposta.data;
};

export const criarPedido = async (dados) => {
  const resposta = await api.post('/orders', dados);
  return resposta.data;
};

export const buscarPedido = async (id) => {
  const resposta = await api.get(`/orders/${id}`);
  return resposta.data;
};

export const atualizarStatusPedido = async (id, status) => {
  const resposta = await api.patch(`/orders/${id}/status`, { status });
  return resposta.data;
};

export const atualizarPedido = async (id, dados) => {
  const resposta = await api.patch(`/orders/${id}`, dados);
  return resposta.data;
};

export const deletarPedido = async (id) => {
  await api.delete(`/orders/${id}`);
};

// Movimentacoes de estoque
export const buscarMovimentacoes = async () => {
  const resposta = await api.get('/stock-movements');
  return resposta.data;
};

export const criarMovimentacao = async (dados) => {
  const resposta = await api.post('/stock-movements', dados);
  return resposta.data;
};

export default api;
