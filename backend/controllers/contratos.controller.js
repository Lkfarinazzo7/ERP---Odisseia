/**
 * Controller para Gestão de Contratos
 */

const Contrato = require('../models/contrato.model');

/**
 * Listar todos os contratos
 */
exports.getAll = async (req, res, next) => {
    try {
        const contratos = await Contrato.findAll();
        res.json({
            success: true,
            count: contratos.length,
            data: contratos
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Buscar contrato por ID
 */
exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contrato = await Contrato.findById(id);

        if (!contrato) {
            return res.status(404).json({
                success: false,
                message: 'Contrato não encontrado'
            });
        }

        res.json({
            success: true,
            data: contrato
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Criar novo contrato
 */
exports.create = async (req, res, next) => {
    try {
        const contratoData = req.body;
        const novoContrato = await Contrato.create(contratoData);

        res.status(201).json({
            success: true,
            message: 'Contrato criado com sucesso',
            data: novoContrato
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Atualizar contrato
 */
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contratoData = req.body;
        const contratoAtualizado = await Contrato.update(id, contratoData);

        if (!contratoAtualizado) {
            return res.status(404).json({
                success: false,
                message: 'Contrato não encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Contrato atualizado com sucesso',
            data: contratoAtualizado
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Deletar contrato
 */
exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletado = await Contrato.delete(id);

        if (!deletado) {
            return res.status(404).json({
                success: false,
                message: 'Contrato não encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Contrato deletado com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Contar contratos ativos
 */
exports.count = async (req, res, next) => {
    try {
        const count = await Contrato.count();
        res.json({
            success: true,
            count: count
        });
    } catch (error) {
        next(error);
    }
};
