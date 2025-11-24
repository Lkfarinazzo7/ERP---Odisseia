/**
 * Controller para Gestão de Despesas
 */

const Despesa = require('../models/despesa.model');

/**
 * Listar todas as despesas
 */
exports.getAll = async (req, res, next) => {
    try {
        const despesas = await Despesa.findAll();
        res.json({
            success: true,
            count: despesas.length,
            data: despesas
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Buscar despesa por ID
 */
exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const despesa = await Despesa.findById(id);

        if (!despesa) {
            return res.status(404).json({
                success: false,
                message: 'Despesa não encontrada'
            });
        }

        res.json({
            success: true,
            data: despesa
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Criar nova despesa
 */
exports.create = async (req, res, next) => {
    try {
        const despesaData = req.body;
        const novaDespesa = await Despesa.create(despesaData);

        res.status(201).json({
            success: true,
            message: 'Despesa criada com sucesso',
            data: novaDespesa
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Atualizar despesa
 */
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const despesaData = req.body;
        const despesaAtualizada = await Despesa.update(id, despesaData);

        if (!despesaAtualizada) {
            return res.status(404).json({
                success: false,
                message: 'Despesa não encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Despesa atualizada com sucesso',
            data: despesaAtualizada
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Deletar despesa
 */
exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletada = await Despesa.delete(id);

        if (!deletada) {
            return res.status(404).json({
                success: false,
                message: 'Despesa não encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Despesa deletada com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Somar despesas do mês atual
 */
exports.sumCurrentMonth = async (req, res, next) => {
    try {
        const total = await Despesa.sumCurrentMonth();
        res.json({
            success: true,
            total: total
        });
    } catch (error) {
        next(error);
    }
};
