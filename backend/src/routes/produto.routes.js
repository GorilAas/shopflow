import { Router } from 'express';
import produtoController from '../controllers/produto.controller.js';

const roteador = Router();

roteador.get('/', produtoController.listar);
roteador.get('/:id', produtoController.buscarUm);

export default roteador;