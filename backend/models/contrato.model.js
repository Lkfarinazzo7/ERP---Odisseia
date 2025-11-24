/**
 * Model para Contratos
 */

const db = require('../config/database');

class Contrato {
    /**
     * Buscar todos os contratos
     */
    static async findAll() {
        const result = await db.query(
            'SELECT * FROM contratos ORDER BY data_criacao DESC'
        );
        return result.rows;
    }

    /**
     * Buscar contrato por ID
     */
    static async findById(id) {
        const result = await db.query(
            'SELECT * FROM contratos WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    /**
     * Criar novo contrato
     */
    static async create(data) {
        const {
            numero_contrato,
            cliente_nome,
            cliente_cpf,
            valor,
            data_inicio,
            data_fim,
            status,
            observacoes
        } = data;

        const result = await db.query(
            `INSERT INTO contratos (
                numero_contrato, cliente_nome, cliente_cpf,
                valor, data_inicio, data_fim, status, observacoes
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [numero_contrato, cliente_nome, cliente_cpf, valor, data_inicio, data_fim, status, observacoes]
        );

        return result.rows[0];
    }

    /**
     * Atualizar contrato
     */
    static async update(id, data) {
        const {
            numero_contrato,
            cliente_nome,
            cliente_cpf,
            valor,
            data_inicio,
            data_fim,
            status,
            observacoes
        } = data;

        const result = await db.query(
            `UPDATE contratos SET
                numero_contrato = $1,
                cliente_nome = $2,
                cliente_cpf = $3,
                valor = $4,
                data_inicio = $5,
                data_fim = $6,
                status = $7,
                observacoes = $8,
                data_atualizacao = NOW()
            WHERE id = $9
            RETURNING *`,
            [numero_contrato, cliente_nome, cliente_cpf, valor, data_inicio, data_fim, status, observacoes, id]
        );

        return result.rows[0];
    }

    /**
     * Deletar contrato
     */
    static async delete(id) {
        const result = await db.query(
            'DELETE FROM contratos WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rows[0];
    }

    /**
     * Contar contratos ativos
     */
    static async count() {
        const result = await db.query(
            "SELECT COUNT(*) as total FROM contratos WHERE status = 'ativo'"
        );
        return parseInt(result.rows[0].total);
    }
}

module.exports = Contrato;
