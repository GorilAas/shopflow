import { Router } from 'express';
import pedidoController from '../controllers/pedido.controller.js';

const roteador = Router();

roteador.post('/', pedidoController.criar);
roteador.get('/:id', pedidoController.buscarUm);
roteador.patch('/:id/status', pedidoController.atualizarStatus);

export default roteador;