# 🚀 ERP Odisseia

Sistema ERP completo para gestão de corretoras de seguros, com controle de contratos, receitas, despesas e comissões.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Deploy](#deploy)
- [API Endpoints](#api-endpoints)
- [Banco de Dados](#banco-de-dados)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 📖 Sobre o Projeto

O **ERP Odisseia** é uma solução completa de gestão empresarial desenvolvida especificamente para corretoras de seguros. O sistema permite controlar:

- ✅ Contratos de clientes
- 💰 Receitas e recebimentos
- 📊 Despesas operacionais
- 💵 Comissões de corretores
- 📈 Relatórios financeiros

---

## ⚡ Funcionalidades

### Dashboard
- Visão geral do negócio
- Cards com estatísticas principais
- Gráficos de receitas e despesas
- Alertas de vencimentos

### Gestão de Contratos
- Cadastro completo de contratos
- Acompanhamento de status
- Histórico de alterações
- Vínculo com receitas e comissões

### Controle Financeiro
- Registro de receitas
- Gerenciamento de despesas
- Categorização por tipo
- Filtros por período

### Comissões
- Cálculo automático de comissões
- Controle de pagamentos
- Relatórios por corretor
- Status de pendências

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilização moderna e responsiva
- **JavaScript (Vanilla)** - Interatividade
- **Font Awesome** - Ícones

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados
- **pg** - Cliente PostgreSQL
- **dotenv** - Variáveis de ambiente
- **helmet** - Segurança
- **cors** - CORS habilitado
- **morgan** - Logger HTTP

### Banco de Dados
- **PostgreSQL 14+** - Banco relacional
- **Supabase** - Hosting do banco (opcional)

### DevOps
- **Vercel** - Deploy do frontend
- **Render** - Deploy do backend
- **Git** - Controle de versão

---

## 📁 Estrutura do Projeto

```
ERP---Odisseia/
│
├── frontend/                 # Interface do usuário
│   ├── index.html           # Página principal
│   ├── style.css            # Estilos CSS
│   └── script.js            # Lógica JavaScript
│
├── backend/                  # API Backend
│   ├── config/              # Configurações
│   │   └── database.js      # Conexão com banco
│   ├── controllers/         # Controladores
│   │   ├── contratos.controller.js
│   │   ├── receitas.controller.js
│   │   ├── despesas.controller.js
│   │   └── comissoes.controller.js
│   ├── models/              # Models (camada de dados)
│   │   ├── contrato.model.js
│   │   ├── receita.model.js
│   │   ├── despesa.model.js
│   │   └── comissao.model.js
│   ├── routes/              # Rotas da API
│   │   ├── contratos.routes.js
│   │   ├── receitas.routes.js
│   │   ├── despesas.routes.js
│   │   └── comissoes.routes.js
│   ├── middleware/          # Middlewares customizados
│   ├── .env.example         # Exemplo de variáveis de ambiente
│   ├── package.json         # Dependências do projeto
│   └── server.js            # Servidor principal
│
├── database/                 # Scripts SQL
│   ├── schema.sql           # Estrutura do banco
│   └── seed.sql             # Dados de exemplo
│
├── .gitignore               # Arquivos ignorados pelo Git
├── LICENSE                  # Licença do projeto
└── README.md                # Este arquivo
```

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** 18+ instalado
- **PostgreSQL** 14+ ou conta no **Supabase**
- **Git** instalado

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/seu-usuario/ERP---Odisseia.git
cd ERP---Odisseia
```

### Passo 2: Instalar Dependências do Backend

```bash
cd backend
npm install
```

### Passo 3: Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
PORT=3000
NODE_ENV=development

DB_HOST=db.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=sua-senha-aqui
DB_SSL=true

SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-aqui

CORS_ORIGIN=http://localhost:5500
```

### Passo 4: Configurar o Banco de Dados

Execute os scripts SQL no Supabase ou PostgreSQL:

1. Acesse o **SQL Editor** do Supabase
2. Execute o conteúdo de `database/schema.sql`
3. Execute o conteúdo de `database/seed.sql` (opcional - dados de exemplo)

---

## ⚙️ Configuração

### Configuração do Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Acesse **Project Settings > Database**
4. Copie as credenciais de conexão
5. Cole no arquivo `.env`

### Configuração de CORS

No arquivo `.env`, adicione os domínios permitidos:

```env
CORS_ORIGIN=http://localhost:5500,https://seu-dominio.vercel.app
```

---

## 💻 Como Usar

### Rodando o Backend

```bash
cd backend
npm start
```

Ou em modo desenvolvimento (com nodemon):

```bash
npm run dev
```

O backend estará rodando em `http://localhost:3000`

### Rodando o Frontend

Opção 1: Abra diretamente o arquivo `frontend/index.html` no navegador

Opção 2: Use um servidor local (recomendado):

```bash
# Com Python
cd frontend
python -m http.server 5500

# Com Node.js (http-server)
npx http-server frontend -p 5500

# Com Live Server (VS Code Extension)
Clique com botão direito no index.html > Open with Live Server
```

Acesse em `http://localhost:5500`

### Verificando o Health Check

```bash
curl http://localhost:3000/health
```

Resposta esperada:
```json
{
  "status": "online",
  "message": "API Odisseia online",
  "timestamp": "2024-03-20T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

## 🌐 Deploy

### Deploy do Frontend (Vercel)

1. Instale o Vercel CLI:
```bash
npm install -g vercel
```

2. Faça deploy:
```bash
cd frontend
vercel --prod
```

3. Configure o diretório raiz como `/frontend`

### Deploy do Backend (Render)

1. Crie uma conta em [render.com](https://render.com)
2. Conecte seu repositório GitHub
3. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**: Adicione todas do `.env`

4. Clique em **Deploy**

### Variáveis de Ambiente no Render

```
PORT=3000
NODE_ENV=production
DB_HOST=seu-host.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=sua-senha
DB_SSL=true
CORS_ORIGIN=https://seu-frontend.vercel.app
```

---

## 📡 API Endpoints

### Health Check

```http
GET /health
```

### Contratos

```http
GET    /api/contratos          # Listar todos
GET    /api/contratos/:id      # Buscar por ID
POST   /api/contratos          # Criar novo
PUT    /api/contratos/:id      # Atualizar
DELETE /api/contratos/:id      # Deletar
GET    /api/contratos/stats/count  # Contar ativos
```

### Receitas

```http
GET    /api/receitas           # Listar todas
GET    /api/receitas/:id       # Buscar por ID
POST   /api/receitas           # Criar nova
PUT    /api/receitas/:id       # Atualizar
DELETE /api/receitas/:id       # Deletar
GET    /api/receitas/stats/mes-atual  # Somar mês atual
```

### Despesas

```http
GET    /api/despesas           # Listar todas
GET    /api/despesas/:id       # Buscar por ID
POST   /api/despesas           # Criar nova
PUT    /api/despesas/:id       # Atualizar
DELETE /api/despesas/:id       # Deletar
GET    /api/despesas/stats/mes-atual  # Somar mês atual
```

### Comissões

```http
GET    /api/comissoes          # Listar todas
GET    /api/comissoes/:id      # Buscar por ID
POST   /api/comissoes          # Criar nova
PUT    /api/comissoes/:id      # Atualizar
DELETE /api/comissoes/:id      # Deletar
GET    /api/comissoes/stats/pendentes  # Somar pendentes
PUT    /api/comissoes/:id/pagar  # Marcar como paga
```

### Exemplo de Requisição

```javascript
// Criar um contrato
fetch('http://localhost:3000/api/contratos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    numero_contrato: 'CTR-2024-999',
    cliente_nome: 'João da Silva',
    cliente_cpf: '123.456.789-00',
    valor: 50000.00,
    data_inicio: '2024-03-20',
    status: 'ativo',
    observacoes: 'Contrato teste'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

---

## 🗄️ Banco de Dados

### Tabelas Principais

#### contratos
- `id` (UUID)
- `numero_contrato` (VARCHAR)
- `cliente_nome` (VARCHAR)
- `cliente_cpf` (VARCHAR)
- `valor` (DECIMAL)
- `data_inicio` (DATE)
- `data_fim` (DATE)
- `status` (VARCHAR)
- `observacoes` (TEXT)
- `data_criacao` (TIMESTAMP)
- `data_atualizacao` (TIMESTAMP)

#### receitas
- `id` (UUID)
- `descricao` (VARCHAR)
- `valor` (DECIMAL)
- `categoria` (VARCHAR)
- `data_recebimento` (DATE)
- `contrato_id` (UUID FK)
- `observacoes` (TEXT)
- `data_criacao` (TIMESTAMP)
- `data_atualizacao` (TIMESTAMP)

#### despesas
- `id` (UUID)
- `descricao` (VARCHAR)
- `valor` (DECIMAL)
- `categoria` (VARCHAR)
- `data_vencimento` (DATE)
- `data_pagamento` (DATE)
- `status` (VARCHAR)
- `observacoes` (TEXT)
- `data_criacao` (TIMESTAMP)
- `data_atualizacao` (TIMESTAMP)

#### comissoes
- `id` (UUID)
- `contrato_id` (UUID FK)
- `corretor_nome` (VARCHAR)
- `percentual` (DECIMAL)
- `valor` (DECIMAL)
- `data_vencimento` (DATE)
- `data_pagamento` (DATE)
- `status` (VARCHAR)
- `observacoes` (TEXT)
- `data_criacao` (TIMESTAMP)
- `data_atualizacao` (TIMESTAMP)

### Views Disponíveis

- `vw_resumo_mensal` - Resumo financeiro do mês
- `vw_comissoes_pendentes` - Comissões pendentes de pagamento
- `vw_contratos_ativos` - Contratos ativos com valores

---

## 🔄 Estruturando Novas Features

### Adicionando um Novo Módulo

1. **Crie a rota** em `backend/routes/novo-modulo.routes.js`
2. **Crie o controller** em `backend/controllers/novo-modulo.controller.js`
3. **Crie o model** em `backend/models/novo-modulo.model.js`
4. **Adicione a tabela** em `database/schema.sql`
5. **Registre a rota** no `server.js`:

```javascript
const novoModuloRoutes = require('./routes/novo-modulo.routes');
app.use('/api/novo-modulo', novoModuloRoutes);
```

6. **Adicione a página** no `frontend/index.html`
7. **Implemente no** `frontend/script.js`

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📧 Contato

**ERP Odisseia** - Sistema de Gestão para Corretoras

- GitHub: [github.com/seu-usuario/ERP---Odisseia](https://github.com/seu-usuario/ERP---Odisseia)
- Issues: [github.com/seu-usuario/ERP---Odisseia/issues](https://github.com/seu-usuario/ERP---Odisseia/issues)

---

## 🎯 Roadmap

- [x] Estrutura base do projeto
- [x] CRUD de contratos
- [x] CRUD de receitas
- [x] CRUD de despesas
- [x] CRUD de comissões
- [x] Dashboard inicial
- [ ] Sistema de autenticação
- [ ] Módulo de relatórios avançados
- [ ] Gráficos interativos
- [ ] Exportação para PDF/Excel
- [ ] Notificações por email
- [ ] App mobile
- [ ] Integração com APIs de seguradoras

---

## 📊 Status do Projeto

O projeto está em **desenvolvimento ativo**. Novas funcionalidades são adicionadas regularmente.

**Versão Atual**: 1.0.0
**Última Atualização**: Março 2024

---

⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!

**Desenvolvido com ❤️ para corretoras de seguros**
