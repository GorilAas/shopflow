import cors from 'cors';
import express from 'express';
import tratarErro from './middlewares/erro.middleware.js';
import rotasAnuncios from './routes/anuncio.routes.js';
import rotasPedidos from './routes/pedido.routes.js';
import rotasProdutos from './routes/produto.routes.js';
import rotasProdutosLocais from './routes/produtoLocal.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/products', rotasProdutos);
app.use('/orders', rotasPedidos);
app.use('/local-products', rotasProdutosLocais);
app.use('/ads', rotasAnuncios);
app.use(tratarErro);

export default app;