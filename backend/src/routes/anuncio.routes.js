import { Router } from 'express';
import anuncioController from '../controllers/anuncio.controller.js';

const roteador = Router();

roteador.get('/', anuncioController.listar);
roteador.get('/:id', anuncioController.buscarUm);
roteador.post('/importar', anuncioController.importar);
roteador.patch('/:id/vincular', anuncioController.vincularProdutoLocal);
roteador.patch('/:id', anuncioController.atualizar);
roteador.delete('/:id', anuncioController.deletar);

export default roteador;