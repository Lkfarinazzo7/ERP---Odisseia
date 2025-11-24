/**
 * Controller para Gestão de Receitas
 */

const Receita = require('../models/receita.model');

/**
 * Listar todas as receitas
 */
exports.getAll = async (req, res, next) => {
    try {
        const receitas = await Receita.findAll();
        res.json({
            success: true,
            count: receitas.length,
            data: receitas
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Buscar receita por ID
 */
exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const receita = await Receita.findById(id);

        if (!receita) {
            return res.status(404).json({
                success: false,
                message: 'Receita não encontrada'
            });
        }

        res.json({
            success: true,
            data: receita
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Criar nova receita
 */
exports.create = async (req, res, next) => {
    try {
        const receitaData = req.body;
        const novaReceita = await Receita.create(receitaData);

        res.status(201).json({
            success: true,
            message: 'Receita criada com sucesso',
            data: novaReceita
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Atualizar receita
 */
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const receitaData = req.body;
        const receitaAtualizada = await Receita.update(id, receitaData);

        if (!receitaAtualizada) {
            return res.status(404).json({
                success: false,
                message: 'Receita não encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Receita atualizada com sucesso',
            data: receitaAtualizada
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Deletar receita
 */
exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletada = await Receita.delete(id);

        if (!deletada) {
            return res.status(404).json({
                success: false,
                message: 'Receita não encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Receita deletada com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Somar receitas do mês atual
 */
exports.sumCurrentMonth = async (req, res, next) => {
    try {
        const total = await Receita.sumCurrentMonth();
        res.json({
            success: true,
            total: total
        });
    } catch (error) {
        next(error);
    }
};
