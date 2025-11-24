/**
 * Configuração de Conexão com Banco de Dados
 * Supabase PostgreSQL
 */

const { Pool } = require('pg');
require('dotenv').config();

// Configuração do pool de conexões
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    max: 20, // Máximo de conexões no pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Teste de conexão
pool.on('connect', () => {
    console.log('✅ Conectado ao banco de dados PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Erro no pool de conexões:', err);
});

/**
 * Executa uma query no banco de dados
 * @param {string} text - Query SQL
 * @param {Array} params - Parâmetros da query
 * @returns {Promise} Resultado da query
 */
const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Erro ao executar query:', error);
        throw error;
    }
};

/**
 * Obtém um cliente do pool para transações
 * @returns {Promise} Cliente do pool
 */
const getClient = async () => {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;

    // Monkey patch para logging
    client.query = (...args) => {
        client.lastQuery = args;
        return query.apply(client, args);
    };

    // Timeout de 5 segundos
    const timeout = setTimeout(() => {
        console.error('Cliente não foi liberado após 5 segundos!');
        console.error('Última query executada:', client.lastQuery);
    }, 5000);

    client.release = () => {
        clearTimeout(timeout);
        client.query = query;
        client.release = release;
        return release.apply(client);
    };

    return client;
};

/**
 * Testa a conexão com o banco
 * @returns {Promise<boolean>}
 */
const testConnection = async () => {
    try {
        const result = await query('SELECT NOW()');
        console.log('✅ Teste de conexão bem-sucedido:', result.rows[0]);
        return true;
    } catch (error) {
        console.error('❌ Falha no teste de conexão:', error);
        return false;
    }
};

module.exports = {
    query,
    getClient,
    pool,
    testConnection
};
