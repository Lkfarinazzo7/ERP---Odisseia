-- ============================================
-- ERP Odisseia - Schema do Banco de Dados
-- Sistema de Gestão para Corretoras
-- PostgreSQL / Supabase
-- ============================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Tabela: CONTRATOS
-- ============================================
CREATE TABLE IF NOT EXISTS contratos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_contrato VARCHAR(50) UNIQUE NOT NULL,
    cliente_nome VARCHAR(255) NOT NULL,
    cliente_cpf VARCHAR(14) NOT NULL,
    valor DECIMAL(15, 2) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'cancelado', 'finalizado')),
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_contratos_numero ON contratos(numero_contrato);
CREATE INDEX idx_contratos_cliente_cpf ON contratos(cliente_cpf);
CREATE INDEX idx_contratos_status ON contratos(status);
CREATE INDEX idx_contratos_data_inicio ON contratos(data_inicio);

-- ============================================
-- Tabela: RECEITAS
-- ============================================
CREATE TABLE IF NOT EXISTS receitas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(15, 2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    data_recebimento DATE NOT NULL,
    contrato_id UUID,
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contrato_id) REFERENCES contratos(id) ON DELETE SET NULL
);

-- Índices para melhor performance
CREATE INDEX idx_receitas_data_recebimento ON receitas(data_recebimento);
CREATE INDEX idx_receitas_categoria ON receitas(categoria);
CREATE INDEX idx_receitas_contrato_id ON receitas(contrato_id);

-- ============================================
-- Tabela: DESPESAS
-- ============================================
CREATE TABLE IF NOT EXISTS despesas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(15, 2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'atrasado', 'cancelado')),
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_despesas_data_vencimento ON despesas(data_vencimento);
CREATE INDEX idx_despesas_data_pagamento ON despesas(data_pagamento);
CREATE INDEX idx_despesas_categoria ON despesas(categoria);
CREATE INDEX idx_despesas_status ON despesas(status);

-- ============================================
-- Tabela: COMISSOES
-- ============================================
CREATE TABLE IF NOT EXISTS comissoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contrato_id UUID NOT NULL,
    corretor_nome VARCHAR(255) NOT NULL,
    percentual DECIMAL(5, 2) NOT NULL,
    valor DECIMAL(15, 2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'cancelado')),
    observacoes TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contrato_id) REFERENCES contratos(id) ON DELETE CASCADE
);

-- Índices para melhor performance
CREATE INDEX idx_comissoes_contrato_id ON comissoes(contrato_id);
CREATE INDEX idx_comissoes_corretor_nome ON comissoes(corretor_nome);
CREATE INDEX idx_comissoes_status ON comissoes(status);
CREATE INDEX idx_comissoes_data_vencimento ON comissoes(data_vencimento);

-- ============================================
-- Triggers para atualizar data_atualizacao
-- ============================================

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para contratos
CREATE TRIGGER update_contratos_updated_at
    BEFORE UPDATE ON contratos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para receitas
CREATE TRIGGER update_receitas_updated_at
    BEFORE UPDATE ON receitas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para despesas
CREATE TRIGGER update_despesas_updated_at
    BEFORE UPDATE ON despesas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para comissões
CREATE TRIGGER update_comissoes_updated_at
    BEFORE UPDATE ON comissoes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Views Úteis
-- ============================================

-- View: Resumo Financeiro Mensal
CREATE OR REPLACE VIEW vw_resumo_mensal AS
SELECT
    DATE_TRUNC('month', CURRENT_DATE) as mes,
    COALESCE(SUM(r.valor), 0) as total_receitas,
    COALESCE(SUM(d.valor), 0) as total_despesas,
    COALESCE(SUM(r.valor), 0) - COALESCE(SUM(d.valor), 0) as saldo
FROM receitas r
FULL OUTER JOIN despesas d ON
    EXTRACT(MONTH FROM r.data_recebimento) = EXTRACT(MONTH FROM d.data_vencimento)
    AND EXTRACT(YEAR FROM r.data_recebimento) = EXTRACT(YEAR FROM d.data_vencimento)
WHERE
    EXTRACT(MONTH FROM r.data_recebimento) = EXTRACT(MONTH FROM CURRENT_DATE)
    OR EXTRACT(MONTH FROM d.data_vencimento) = EXTRACT(MONTH FROM CURRENT_DATE);

-- View: Comissões Pendentes
CREATE OR REPLACE VIEW vw_comissoes_pendentes AS
SELECT
    c.id,
    c.corretor_nome,
    co.numero_contrato,
    co.cliente_nome,
    c.valor,
    c.data_vencimento,
    CASE
        WHEN c.data_vencimento < CURRENT_DATE THEN 'ATRASADO'
        ELSE 'PENDENTE'
    END as situacao
FROM comissoes c
JOIN contratos co ON c.contrato_id = co.id
WHERE c.status = 'pendente'
ORDER BY c.data_vencimento ASC;

-- View: Contratos Ativos com Valores
CREATE OR REPLACE VIEW vw_contratos_ativos AS
SELECT
    c.id,
    c.numero_contrato,
    c.cliente_nome,
    c.cliente_cpf,
    c.valor,
    c.data_inicio,
    c.data_fim,
    COALESCE(SUM(com.valor), 0) as total_comissoes,
    c.valor - COALESCE(SUM(com.valor), 0) as valor_liquido
FROM contratos c
LEFT JOIN comissoes com ON c.id = com.contrato_id
WHERE c.status = 'ativo'
GROUP BY c.id, c.numero_contrato, c.cliente_nome, c.cliente_cpf, c.valor, c.data_inicio, c.data_fim
ORDER BY c.data_inicio DESC;

-- ============================================
-- Comentários nas Tabelas
-- ============================================

COMMENT ON TABLE contratos IS 'Tabela de contratos da corretora';
COMMENT ON TABLE receitas IS 'Tabela de receitas e recebimentos';
COMMENT ON TABLE despesas IS 'Tabela de despesas e pagamentos';
COMMENT ON TABLE comissoes IS 'Tabela de comissões de corretores';

-- ============================================
-- Fim do Schema
-- ============================================
