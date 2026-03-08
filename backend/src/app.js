import express from 'express';
import cors from 'cors';
import rotasProdutos from './routes/produto.routes.js';
import rotasPedidos from './routes/pedido.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', rotasProdutos);
app.use('/orders', rotasPedidos);

export default app;
