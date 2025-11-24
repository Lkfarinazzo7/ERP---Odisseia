/**
 * Rotas para Gestão de Receitas
 */

const express = require('express');
const router = express.Router();
const receitasController = require('../controllers/receitas.controller');

// GET - Listar todas as receitas
router.get('/', receitasController.getAll);

// GET - Buscar receita por ID
router.get('/:id', receitasController.getById);

// POST - Criar nova receita
router.post('/', receitasController.create);

// PUT - Atualizar receita
router.put('/:id', receitasController.update);

// DELETE - Deletar receita
router.delete('/:id', receitasController.delete);

// GET - Somar receitas do mês atual
router.get('/stats/mes-atual', receitasController.sumCurrentMonth);

module.exports = router;
