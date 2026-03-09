import axios from 'axios';

const URL_API = 'https://dummyjson.com/products';
const normalizarProduto = (produto) => ({
  id: produto.id,
  nome: produto.title,
  descricao: produto.description,
  preco: parseFloat(produto.price.toFixed(2)),
  estoque: produto.stock,
  imagem: produto.thumbnail,
});

const buscarTodos = async ({ limite = 30, pagina = 0 } = {}) => {
  const { data } = await axios.get(URL_API, {
    params: { limit: limite, skip: pagina * limite },
  });
  return data.products.map(normalizarProduto);
};

const buscarPorId = async (id) => {
  const { data } = await axios.get(`${URL_API}/${id}`);
  return normalizarProduto(data);
};

export default { buscarTodos, buscarPorId };