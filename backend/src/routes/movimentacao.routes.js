import { Router } from 'express';
import movimentacaoController from '../controllers/movimentacao.controller.js';

const roteador = Router();

roteador.get('/', movimentacaoController.listar);
roteador.post('/', movimentacaoController.criar);

export default roteador;
