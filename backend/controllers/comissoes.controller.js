/**
 * Controller para Gestão de Comissões
 */

const Comissao = require('../models/comissao.model');

/**
 * Listar todas as comissões
 */
exports.getAll = async (req, res, next) => {
    try {
        const comissoes = await Comissao.findAll();
        res.json({
            success: true,
            count: comissoes.length,
            data: comissoes
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Buscar comissão por ID
 */
exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comissao = await Comissao.findById(id);

        if (!comissao) {
            return res.status(404).json({
                success: false,
                message: 'Comissão não encontrada'
            });
        }

        res.json({
            success: true,
            data: comissao
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Criar nova comissão
 */
exports.create = async (req, res, next) => {
    try {
        const comissaoData = req.body;
        const novaComissao = await Comissao.create(comissaoData);

        res.status(201).json({
            success: true,
            message: 'Comissão criada com sucesso',
            data: novaComissao
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Atualizar comissão
 */
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comissaoData = req.body;
        const comissaoAtualizada = await Comissao.update(id, comissaoData);

        if (!comissaoAtualizada) {
            return res.status(404).json({
                success: false,
                message: 'Comissão não encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Comissão atualizada com sucesso',
            data: comissaoAtualizada
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Deletar comissão
 */
exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletada = await Comissao.delete(id);

        if (!deletada) {
            return res.status(404).json({
                success: false,
                message: 'Comissão não encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Comissão deletada com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Somar comissões pendentes
 */
exports.sumPending = async (req, res, next) => {
    try {
        const total = await Comissao.sumPending();
        res.json({
            success: true,
            total: total
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Marcar comissão como paga
 */
exports.markAsPaid = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comissaoPaga = await Comissao.markAsPaid(id);

        if (!comissaoPaga) {
            return res.status(404).json({
                success: false,
                message: 'Comissão não encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Comissão marcada como paga',
            data: comissaoPaga
        });
    } catch (error) {
        next(error);
    }
};
