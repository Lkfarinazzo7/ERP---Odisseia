/**
 * Rotas para Gestão de Contratos
 */

const express = require('express');
const router = express.Router();
const contratosController = require('../controllers/contratos.controller');

// GET - Listar todos os contratos
router.get('/', contratosController.getAll);

// GET - Buscar contrato por ID
router.get('/:id', contratosController.getById);

// POST - Criar novo contrato
router.post('/', contratosController.create);

// PUT - Atualizar contrato
router.put('/:id', contratosController.update);

// DELETE - Deletar contrato
router.delete('/:id', contratosController.delete);

// GET - Contar contratos ativos
router.get('/stats/count', contratosController.count);

module.exports = router;
