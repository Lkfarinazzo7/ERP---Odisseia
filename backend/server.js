/**
 * ERP Odisseia - Servidor Principal
 * API Backend para Sistema de Gestão de Corretoras
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ===========================
// Middlewares de Segurança
// ===========================
app.use(helmet());

// Rate limiting - Prevenir abuso de requisições
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
    message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});
app.use('/api', limiter);

// ===========================
// Middlewares Gerais
// ===========================
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ===========================
// Rotas
// ===========================

// Rota de Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'online',
        message: 'API Odisseia online',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo à API do ERP Odisseia',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            contratos: '/api/contratos',
            receitas: '/api/receitas',
            despesas: '/api/despesas',
            comissoes: '/api/comissoes'
        }
    });
});

// Importar rotas dos módulos
const contratosRoutes = require('./routes/contratos.routes');
const receitasRoutes = require('./routes/receitas.routes');
const despesasRoutes = require('./routes/despesas.routes');
const comissoesRoutes = require('./routes/comissoes.routes');

// Registrar rotas
app.use('/api/contratos', contratosRoutes);
app.use('/api/receitas', receitasRoutes);
app.use('/api/despesas', despesasRoutes);
app.use('/api/comissoes', comissoesRoutes);

// ===========================
// Tratamento de Erros
// ===========================

// Rota não encontrada
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        path: req.originalUrl
    });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
    console.error('Erro:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor';

    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ===========================
// Inicialização do Servidor
// ===========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('=================================');
    console.log('🚀 ERP Odisseia API');
    console.log('=================================');
    console.log(`📡 Servidor rodando na porta ${PORT}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log(`💚 Health Check: http://localhost:${PORT}/health`);
    console.log('=================================');
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err);
    process.exit(1);
});

module.exports = app;
