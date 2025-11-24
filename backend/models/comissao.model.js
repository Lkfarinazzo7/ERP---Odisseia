/**
 * Model para Comissões
 */

const db = require('../config/database');

class Comissao {
    /**
     * Buscar todas as comissões
     */
    static async findAll() {
        const result = await db.query(
            'SELECT * FROM comissoes ORDER BY data_criacao DESC'
        );
        return result.rows;
    }

    /**
     * Buscar comissão por ID
     */
    static async findById(id) {
        const result = await db.query(
            'SELECT * FROM comissoes WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    /**
     * Criar nova comissão
     */
    static async create(data) {
        const {
            contrato_id,
            corretor_nome,
            percentual,
            valor,
            data_vencimento,
            status,
            observacoes
        } = data;

        const result = await db.query(
            `INSERT INTO comissoes (
                contrato_id, corretor_nome, percentual,
                valor, data_vencimento, status, observacoes
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [contrato_id, corretor_nome, percentual, valor, data_vencimento, status, observacoes]
        );

        return result.rows[0];
    }

    /**
     * Atualizar comissão
     */
    static async update(id, data) {
        const {
            contrato_id,
            corretor_nome,
            percentual,
            valor,
            data_vencimento,
            status,
            observacoes
        } = data;

        const result = await db.query(
            `UPDATE comissoes SET
                contrato_id = $1,
                corretor_nome = $2,
                percentual = $3,
                valor = $4,
                data_vencimento = $5,
                status = $6,
                observacoes = $7,
                data_atualizacao = NOW()
            WHERE id = $8
            RETURNING *`,
            [contrato_id, corretor_nome, percentual, valor, data_vencimento, status, observacoes, id]
        );

        return result.rows[0];
    }

    /**
     * Deletar comissão
     */
    static async delete(id) {
        const result = await db.query(
            'DELETE FROM comissoes WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rows[0];
    }

    /**
     * Somar comissões pendentes
     */
    static async sumPending() {
        const result = await db.query(
            `SELECT COALESCE(SUM(valor), 0) as total
             FROM comissoes
             WHERE status = 'pendente'`
        );
        return parseFloat(result.rows[0].total);
    }

    /**
     * Marcar comissão como paga
     */
    static async markAsPaid(id) {
        const result = await db.query(
            `UPDATE comissoes SET
                status = 'pago',
                data_pagamento = NOW(),
                data_atualizacao = NOW()
            WHERE id = $1
            RETURNING *`,
            [id]
        );
        return result.rows[0];
    }
}

module.exports = Comissao;
