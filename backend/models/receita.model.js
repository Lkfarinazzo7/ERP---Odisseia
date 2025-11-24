/**
 * Model para Receitas
 */

const db = require('../config/database');

class Receita {
    /**
     * Buscar todas as receitas
     */
    static async findAll() {
        const result = await db.query(
            'SELECT * FROM receitas ORDER BY data_recebimento DESC'
        );
        return result.rows;
    }

    /**
     * Buscar receita por ID
     */
    static async findById(id) {
        const result = await db.query(
            'SELECT * FROM receitas WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    /**
     * Criar nova receita
     */
    static async create(data) {
        const {
            descricao,
            valor,
            categoria,
            data_recebimento,
            contrato_id,
            observacoes
        } = data;

        const result = await db.query(
            `INSERT INTO receitas (
                descricao, valor, categoria,
                data_recebimento, contrato_id, observacoes
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [descricao, valor, categoria, data_recebimento, contrato_id, observacoes]
        );

        return result.rows[0];
    }

    /**
     * Atualizar receita
     */
    static async update(id, data) {
        const {
            descricao,
            valor,
            categoria,
            data_recebimento,
            contrato_id,
            observacoes
        } = data;

        const result = await db.query(
            `UPDATE receitas SET
                descricao = $1,
                valor = $2,
                categoria = $3,
                data_recebimento = $4,
                contrato_id = $5,
                observacoes = $6,
                data_atualizacao = NOW()
            WHERE id = $7
            RETURNING *`,
            [descricao, valor, categoria, data_recebimento, contrato_id, observacoes, id]
        );

        return result.rows[0];
    }

    /**
     * Deletar receita
     */
    static async delete(id) {
        const result = await db.query(
            'DELETE FROM receitas WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rows[0];
    }

    /**
     * Somar receitas do mês atual
     */
    static async sumCurrentMonth() {
        const result = await db.query(
            `SELECT COALESCE(SUM(valor), 0) as total
             FROM receitas
             WHERE EXTRACT(MONTH FROM data_recebimento) = EXTRACT(MONTH FROM CURRENT_DATE)
             AND EXTRACT(YEAR FROM data_recebimento) = EXTRACT(YEAR FROM CURRENT_DATE)`
        );
        return parseFloat(result.rows[0].total);
    }
}

module.exports = Receita;
