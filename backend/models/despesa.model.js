/**
 * Model para Despesas
 */

const db = require('../config/database');

class Despesa {
    /**
     * Buscar todas as despesas
     */
    static async findAll() {
        const result = await db.query(
            'SELECT * FROM despesas ORDER BY data_vencimento DESC'
        );
        return result.rows;
    }

    /**
     * Buscar despesa por ID
     */
    static async findById(id) {
        const result = await db.query(
            'SELECT * FROM despesas WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    /**
     * Criar nova despesa
     */
    static async create(data) {
        const {
            descricao,
            valor,
            categoria,
            data_vencimento,
            data_pagamento,
            status,
            observacoes
        } = data;

        const result = await db.query(
            `INSERT INTO despesas (
                descricao, valor, categoria,
                data_vencimento, data_pagamento, status, observacoes
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [descricao, valor, categoria, data_vencimento, data_pagamento, status, observacoes]
        );

        return result.rows[0];
    }

    /**
     * Atualizar despesa
     */
    static async update(id, data) {
        const {
            descricao,
            valor,
            categoria,
            data_vencimento,
            data_pagamento,
            status,
            observacoes
        } = data;

        const result = await db.query(
            `UPDATE despesas SET
                descricao = $1,
                valor = $2,
                categoria = $3,
                data_vencimento = $4,
                data_pagamento = $5,
                status = $6,
                observacoes = $7,
                data_atualizacao = NOW()
            WHERE id = $8
            RETURNING *`,
            [descricao, valor, categoria, data_vencimento, data_pagamento, status, observacoes, id]
        );

        return result.rows[0];
    }

    /**
     * Deletar despesa
     */
    static async delete(id) {
        const result = await db.query(
            'DELETE FROM despesas WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rows[0];
    }

    /**
     * Somar despesas do mês atual
     */
    static async sumCurrentMonth() {
        const result = await db.query(
            `SELECT COALESCE(SUM(valor), 0) as total
             FROM despesas
             WHERE EXTRACT(MONTH FROM data_vencimento) = EXTRACT(MONTH FROM CURRENT_DATE)
             AND EXTRACT(YEAR FROM data_vencimento) = EXTRACT(YEAR FROM CURRENT_DATE)`
        );
        return parseFloat(result.rows[0].total);
    }
}

module.exports = Despesa;
