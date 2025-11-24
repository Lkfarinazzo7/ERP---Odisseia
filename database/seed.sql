-- ============================================
-- ERP Odisseia - Dados de Exemplo (Seed)
-- Dados iniciais para teste e desenvolvimento
-- ============================================

-- Limpar dados existentes (cuidado em produção!)
-- TRUNCATE TABLE comissoes, receitas, despesas, contratos CASCADE;

-- ============================================
-- Seed: CONTRATOS
-- ============================================

INSERT INTO contratos (numero_contrato, cliente_nome, cliente_cpf, valor, data_inicio, data_fim, status, observacoes) VALUES
('CTR-2024-001', 'João Silva Santos', '123.456.789-00', 150000.00, '2024-01-15', '2024-12-15', 'ativo', 'Contrato de seguro residencial premium'),
('CTR-2024-002', 'Maria Oliveira Costa', '987.654.321-00', 85000.00, '2024-02-01', '2025-02-01', 'ativo', 'Seguro automotivo completo'),
('CTR-2024-003', 'Carlos Eduardo Souza', '456.789.123-00', 220000.00, '2024-01-20', '2024-06-20', 'finalizado', 'Seguro empresarial - Concluído'),
('CTR-2024-004', 'Ana Paula Lima', '321.654.987-00', 95000.00, '2024-03-10', '2025-03-10', 'ativo', 'Seguro de vida individual'),
('CTR-2024-005', 'Roberto Fernandes', '789.123.456-00', 180000.00, '2024-02-15', NULL, 'ativo', 'Seguro saúde empresarial');

-- ============================================
-- Seed: RECEITAS
-- ============================================

INSERT INTO receitas (descricao, valor, categoria, data_recebimento, contrato_id, observacoes)
SELECT
    'Pagamento parcela 1 - ' || numero_contrato,
    valor * 0.30,
    'Comissão',
    data_inicio + INTERVAL '15 days',
    id,
    'Primeira parcela recebida'
FROM contratos WHERE numero_contrato = 'CTR-2024-001';

INSERT INTO receitas (descricao, valor, categoria, data_recebimento, contrato_id, observacoes)
SELECT
    'Pagamento parcela 1 - ' || numero_contrato,
    valor * 0.40,
    'Comissão',
    data_inicio + INTERVAL '10 days',
    id,
    'Parcela inicial'
FROM contratos WHERE numero_contrato = 'CTR-2024-002';

INSERT INTO receitas (descricao, valor, categoria, data_recebimento, observacoes) VALUES
('Taxa de abertura de contrato', 5000.00, 'Taxa', '2024-01-05', 'Taxa administrativa'),
('Bônus de produtividade', 3500.00, 'Bônus', '2024-02-28', 'Bônus mensal da seguradora'),
('Renovação de apólice', 8000.00, 'Renovação', '2024-03-15', 'Cliente renovou contrato'),
('Consultoria financeira', 2500.00, 'Serviço', '2024-03-20', 'Serviço de consultoria prestado');

-- ============================================
-- Seed: DESPESAS
-- ============================================

INSERT INTO despesas (descricao, valor, categoria, data_vencimento, data_pagamento, status, observacoes) VALUES
('Aluguel do escritório', 3500.00, 'Infraestrutura', '2024-03-10', '2024-03-08', 'pago', 'Aluguel mensal'),
('Salário funcionários', 12000.00, 'Pessoal', '2024-03-05', '2024-03-05', 'pago', 'Folha de pagamento'),
('Internet e telefonia', 450.00, 'Comunicação', '2024-03-15', '2024-03-14', 'pago', 'Pacote empresarial'),
('Material de escritório', 680.00, 'Material', '2024-03-20', NULL, 'pendente', 'Papelaria e suprimentos'),
('Licença de software', 1200.00, 'Tecnologia', '2024-03-25', NULL, 'pendente', 'Licenças anuais renovadas'),
('Marketing digital', 2500.00, 'Marketing', '2024-03-30', NULL, 'pendente', 'Campanha Google Ads'),
('Contador', 1800.00, 'Serviços', '2024-03-10', '2024-03-10', 'pago', 'Serviços contábeis mensais'),
('Energia elétrica', 820.00, 'Infraestrutura', '2024-03-18', NULL, 'pendente', 'Conta de luz'),
('Manutenção veículo', 450.00, 'Manutenção', '2024-03-22', NULL, 'pendente', 'Revisão carro da empresa'),
('Treinamento equipe', 3200.00, 'Capacitação', '2024-04-05', NULL, 'pendente', 'Curso de vendas');

-- ============================================
-- Seed: COMISSÕES
-- ============================================

INSERT INTO comissoes (contrato_id, corretor_nome, percentual, valor, data_vencimento, data_pagamento, status, observacoes)
SELECT
    id,
    'José Carlos Mendes',
    15.00,
    valor * 0.15,
    data_inicio + INTERVAL '30 days',
    data_inicio + INTERVAL '32 days',
    'pago',
    'Comissão sobre venda do contrato'
FROM contratos WHERE numero_contrato = 'CTR-2024-001';

INSERT INTO comissoes (contrato_id, corretor_nome, percentual, valor, data_vencimento, status, observacoes)
SELECT
    id,
    'Fernanda Alves Costa',
    12.00,
    valor * 0.12,
    data_inicio + INTERVAL '30 days',
    'pendente',
    'Aguardando aprovação da seguradora'
FROM contratos WHERE numero_contrato = 'CTR-2024-002';

INSERT INTO comissoes (contrato_id, corretor_nome, percentual, valor, data_vencimento, status, observacoes)
SELECT
    id,
    'Ricardo Souza Lima',
    10.00,
    valor * 0.10,
    data_inicio + INTERVAL '45 days',
    'pendente',
    'Comissão sobre contrato empresarial'
FROM contratos WHERE numero_contrato = 'CTR-2024-005';

INSERT INTO comissoes (contrato_id, corretor_nome, percentual, valor, data_vencimento, data_pagamento, status, observacoes)
SELECT
    id,
    'Patrícia Rodrigues',
    18.00,
    valor * 0.18,
    data_inicio + INTERVAL '30 days',
    data_fim,
    'pago',
    'Contrato finalizado - comissão completa paga'
FROM contratos WHERE numero_contrato = 'CTR-2024-003';

INSERT INTO comissoes (contrato_id, corretor_nome, percentual, valor, data_vencimento, status, observacoes)
SELECT
    id,
    'Marcos Antonio Silva',
    14.00,
    valor * 0.14,
    data_inicio + INTERVAL '30 days',
    'pendente',
    'Primeira comissão - parcial'
FROM contratos WHERE numero_contrato = 'CTR-2024-004';

-- ============================================
-- Verificação dos Dados Inseridos
-- ============================================

-- Resumo de dados inseridos
SELECT 'Contratos' as tabela, COUNT(*) as total FROM contratos
UNION ALL
SELECT 'Receitas' as tabela, COUNT(*) as total FROM receitas
UNION ALL
SELECT 'Despesas' as tabela, COUNT(*) as total FROM despesas
UNION ALL
SELECT 'Comissões' as tabela, COUNT(*) as total FROM comissoes;

-- Resumo financeiro
SELECT
    (SELECT COALESCE(SUM(valor), 0) FROM receitas) as total_receitas,
    (SELECT COALESCE(SUM(valor), 0) FROM despesas) as total_despesas,
    (SELECT COALESCE(SUM(valor), 0) FROM comissoes WHERE status = 'pendente') as comissoes_pendentes,
    (SELECT COALESCE(SUM(valor), 0) FROM receitas) -
    (SELECT COALESCE(SUM(valor), 0) FROM despesas) as saldo;

-- ============================================
-- Fim do Seed
-- ============================================
