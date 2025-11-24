/**
 * ERP Odisseia - Script Principal
 * Sistema de Gestão para Corretoras
 */

// ===========================
// Configuração da API
// ===========================
const API_URL = 'http://localhost:3000/api';

// ===========================
// Gerenciamento de Navegação
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupSidebarToggle();
    setupEventListeners();
    loadDashboardData();
}

/**
 * Configura a navegação entre páginas
 */
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active de todos os itens
            navItems.forEach(nav => nav.classList.remove('active'));

            // Adiciona active ao item clicado
            item.classList.add('active');

            // Obtém a página a ser exibida
            const pageId = item.getAttribute('data-page');
            showPage(pageId);

            // Fecha sidebar em mobile
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
    });
}

/**
 * Exibe a página selecionada
 */
function showPage(pageId) {
    // Esconde todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Exibe a página selecionada
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Carrega dados específicos da página
    loadPageData(pageId);
}

/**
 * Carrega dados específicos de cada página
 */
async function loadPageData(pageId) {
    switch(pageId) {
        case 'dashboard':
            await loadDashboardData();
            break;
        case 'contratos':
            await loadContratos();
            break;
        case 'receitas':
            await loadReceitas();
            break;
        case 'despesas':
            await loadDespesas();
            break;
        case 'comissoes':
            await loadComissoes();
            break;
        default:
            console.log(`Página ${pageId} ainda não implementada`);
    }
}

// ===========================
// Toggle do Sidebar
// ===========================
function setupSidebarToggle() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Toggle mobile
    if (window.innerWidth <= 768) {
        const navbarBrand = document.querySelector('.navbar-brand');
        navbarBrand.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

// ===========================
// Event Listeners Gerais
// ===========================
function setupEventListeners() {
    // Botão de notificações
    const notificationsBtn = document.getElementById('notificationsBtn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', () => {
            showNotification('Nenhuma notificação nova', 'info');
        });
    }

    // Botão de logout
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            handleLogout();
        });
    }
}

// ===========================
// Carregamento de Dados
// ===========================

/**
 * Carrega dados do dashboard
 */
async function loadDashboardData() {
    try {
        // Simulação de carregamento de dados
        // Em produção, fazer requisições reais à API
        console.log('Carregando dados do dashboard...');

        // Aqui você faria requisições para:
        // - GET /api/contratos/count
        // - GET /api/receitas/sum/mes-atual
        // - GET /api/despesas/sum/mes-atual
        // - GET /api/comissoes/sum/pendentes

        // Por enquanto, dados mockados
        updateDashboardCards({
            contratos: 0,
            receitas: 0,
            despesas: 0,
            comissoes: 0
        });

    } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        showNotification('Erro ao carregar dados do dashboard', 'error');
    }
}

/**
 * Atualiza os cards do dashboard
 */
function updateDashboardCards(data) {
    const cards = document.querySelectorAll('.dashboard-cards .card-value');

    if (cards[0]) cards[0].textContent = data.contratos;
    if (cards[1]) cards[1].textContent = formatCurrency(data.receitas);
    if (cards[2]) cards[2].textContent = formatCurrency(data.despesas);
    if (cards[3]) cards[3].textContent = formatCurrency(data.comissoes);
}

/**
 * Carrega lista de contratos
 */
async function loadContratos() {
    try {
        console.log('Carregando contratos...');
        // const response = await fetch(`${API_URL}/contratos`);
        // const contratos = await response.json();
        // renderContratos(contratos);
    } catch (error) {
        console.error('Erro ao carregar contratos:', error);
    }
}

/**
 * Carrega lista de receitas
 */
async function loadReceitas() {
    try {
        console.log('Carregando receitas...');
        // const response = await fetch(`${API_URL}/receitas`);
        // const receitas = await response.json();
        // renderReceitas(receitas);
    } catch (error) {
        console.error('Erro ao carregar receitas:', error);
    }
}

/**
 * Carrega lista de despesas
 */
async function loadDespesas() {
    try {
        console.log('Carregando despesas...');
        // const response = await fetch(`${API_URL}/despesas`);
        // const despesas = await response.json();
        // renderDespesas(despesas);
    } catch (error) {
        console.error('Erro ao carregar despesas:', error);
    }
}

/**
 * Carrega lista de comissões
 */
async function loadComissoes() {
    try {
        console.log('Carregando comissões...');
        // const response = await fetch(`${API_URL}/comissoes`);
        // const comissoes = await response.json();
        // renderComissoes(comissoes);
    } catch (error) {
        console.error('Erro ao carregar comissões:', error);
    }
}

// ===========================
// Utilidades
// ===========================

/**
 * Formata valor para moeda brasileira
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Formata data para padrão brasileiro
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

/**
 * Exibe notificação para o usuário
 */
function showNotification(message, type = 'info') {
    // Implementar sistema de notificações
    // Por enquanto, apenas console.log
    console.log(`[${type.toUpperCase()}] ${message}`);
    alert(message);
}

/**
 * Realiza logout do sistema
 */
function handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        console.log('Realizando logout...');
        // Limpar tokens, sessão, etc.
        // Redirecionar para página de login
        showNotification('Logout realizado com sucesso!', 'success');
    }
}

// ===========================
// Requisições à API
// ===========================

/**
 * Função auxiliar para fazer requisições GET
 */
async function apiGet(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Função auxiliar para fazer requisições POST
 */
async function apiPost(endpoint, data) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao enviar para ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Função auxiliar para fazer requisições PUT
 */
async function apiPut(endpoint, data) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao atualizar ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Função auxiliar para fazer requisições DELETE
 */
async function apiDelete(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao deletar ${endpoint}:`, error);
        throw error;
    }
}

// ===========================
// Inicialização
// ===========================
console.log('ERP Odisseia - Sistema carregado!');
console.log('Versão: 1.0.0');
