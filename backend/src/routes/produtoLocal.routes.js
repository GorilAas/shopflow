import { Router } from 'express';
import produtoLocalController from '../controllers/produtoLocal.controller.js';

const roteador = Router();

roteador.get('/', produtoLocalController.listar);
roteador.get('/:id', produtoLocalController.buscarUm);
roteador.post('/', produtoLocalController.criar);
roteador.patch('/:id', produtoLocalController.atualizar);

export default roteador;