import { Router } from 'express';
import pedidoController from '../controllers/pedido.controller.js';

const roteador = Router();

roteador.get('/', pedidoController.listar);
roteador.post('/', pedidoController.criar);
roteador.get('/:id', pedidoController.buscarUm);
roteador.patch('/:id/status', pedidoController.atualizarStatus);
roteador.patch('/:id', pedidoController.atualizar);
roteador.delete('/:id', pedidoController.deletar);

export default roteador;