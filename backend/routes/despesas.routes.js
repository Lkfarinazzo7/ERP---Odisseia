/**
 * Rotas para Gestão de Despesas
 */

const express = require('express');
const router = express.Router();
const despesasController = require('../controllers/despesas.controller');

// GET - Listar todas as despesas
router.get('/', despesasController.getAll);

// GET - Buscar despesa por ID
router.get('/:id', despesasController.getById);

// POST - Criar nova despesa
router.post('/', despesasController.create);

// PUT - Atualizar despesa
router.put('/:id', despesasController.update);

// DELETE - Deletar despesa
router.delete('/:id', despesasController.delete);

// GET - Somar despesas do mês atual
router.get('/stats/mes-atual', despesasController.sumCurrentMonth);

module.exports = router;
