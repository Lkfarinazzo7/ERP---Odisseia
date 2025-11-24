/**
 * Rotas para Gestão de Comissões
 */

const express = require('express');
const router = express.Router();
const comissoesController = require('../controllers/comissoes.controller');

// GET - Listar todas as comissões
router.get('/', comissoesController.getAll);

// GET - Buscar comissão por ID
router.get('/:id', comissoesController.getById);

// POST - Criar nova comissão
router.post('/', comissoesController.create);

// PUT - Atualizar comissão
router.put('/:id', comissoesController.update);

// DELETE - Deletar comissão
router.delete('/:id', comissoesController.delete);

// GET - Somar comissões pendentes
router.get('/stats/pendentes', comissoesController.sumPending);

// PUT - Marcar comissão como paga
router.put('/:id/pagar', comissoesController.markAsPaid);

module.exports = router;
