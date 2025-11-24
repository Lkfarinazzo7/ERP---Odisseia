# 🚀 Guia de Deploy - ERP Odisseia

Este documento contém instruções detalhadas para fazer o deploy do ERP Odisseia em produção.

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Deploy do Banco de Dados (Supabase)](#deploy-do-banco-de-dados-supabase)
3. [Deploy do Backend (Render)](#deploy-do-backend-render)
4. [Deploy do Frontend (Vercel)](#deploy-do-frontend-vercel)
5. [Configuração de Domínio Customizado](#configuração-de-domínio-customizado)
6. [Monitoramento e Logs](#monitoramento-e-logs)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Pré-requisitos

Antes de começar, certifique-se de ter:

- [ ] Conta no [Supabase](https://supabase.com) (gratuita)
- [ ] Conta no [Render](https://render.com) (gratuita)
- [ ] Conta no [Vercel](https://vercel.com) (gratuita)
- [ ] Repositório no GitHub com o código
- [ ] Git instalado localmente

---

## 🗄️ Deploy do Banco de Dados (Supabase)

### Passo 1: Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: `erp-odisseia`
   - **Database Password**: (escolha uma senha forte)
   - **Region**: Selecione a região mais próxima
4. Clique em **"Create new project"**
5. Aguarde a criação (pode levar alguns minutos)

### Passo 2: Executar Scripts SQL

1. No painel do Supabase, clique em **"SQL Editor"** no menu lateral
2. Clique em **"New query"**
3. Copie todo o conteúdo de `database/schema.sql`
4. Cole no editor e clique em **"Run"**
5. Repita o processo com `database/seed.sql` (opcional - apenas para dados de teste)

### Passo 3: Obter Credenciais

1. Clique em **"Settings"** > **"Database"**
2. Anote as seguintes informações:
   - **Host**: `db.[seu-projeto].supabase.co`
   - **Port**: `5432`
   - **Database name**: `postgres`
   - **User**: `postgres`
   - **Password**: (a senha que você criou)

3. Também anote:
   - Clique em **"Settings"** > **"API"**
   - **Project URL**: `https://[seu-projeto].supabase.co`
   - **anon public**: (chave pública)

---

## 🔧 Deploy do Backend (Render)

### Passo 1: Preparar Repositório

1. Certifique-se que seu código está no GitHub
2. Certifique-se que `backend/.env` está no `.gitignore`
3. Commit e push:

```bash
git add .
git commit -m "Preparar para deploy"
git push origin main
```

### Passo 2: Criar Web Service no Render

1. Acesse [render.com](https://render.com) e faça login
2. Clique em **"New +"** > **"Web Service"**
3. Conecte seu repositório GitHub
4. Preencha:
   - **Name**: `erp-odisseia-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Passo 3: Configurar Variáveis de Ambiente

Na seção **"Environment Variables"**, adicione:

```
PORT=3000
NODE_ENV=production
DB_HOST=db.[seu-projeto].supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=sua-senha-supabase
DB_SSL=true
CORS_ORIGIN=https://seu-frontend.vercel.app
```

**Importante**: Deixe `CORS_ORIGIN` vazio por enquanto, você vai atualizar depois do deploy do frontend.

### Passo 4: Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o deploy (pode levar 5-10 minutos)
3. Quando finalizar, você verá uma URL: `https://erp-odisseia-backend.onrender.com`
4. Teste o endpoint: `https://erp-odisseia-backend.onrender.com/health`

---

## 🎨 Deploy do Frontend (Vercel)

### Passo 1: Instalar Vercel CLI (Opcional)

```bash
npm install -g vercel
```

### Passo 2: Deploy via GitHub (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New..."** > **"Project"**
3. Importe seu repositório do GitHub
4. Configure:
   - **Framework Preset**: `Other`
   - **Root Directory**: `frontend`
   - **Build Command**: (deixe vazio)
   - **Output Directory**: `./`

### Passo 3: Atualizar URL da API

1. No arquivo `frontend/script.js`, localize:

```javascript
const API_URL = 'http://localhost:3000/api';
```

2. Altere para:

```javascript
const API_URL = 'https://erp-odisseia-backend.onrender.com/api';
```

3. Commit e push:

```bash
git add frontend/script.js
git commit -m "Atualizar URL da API para produção"
git push origin main
```

### Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde a conclusão
3. Você receberá uma URL: `https://erp-odisseia.vercel.app`

### Passo 5: Atualizar CORS no Backend

1. Volte ao Render
2. Acesse seu Web Service
3. Vá em **"Environment"**
4. Atualize `CORS_ORIGIN`:

```
CORS_ORIGIN=https://erp-odisseia.vercel.app
```

5. Clique em **"Save Changes"**
6. O serviço será reiniciado automaticamente

---

## 🌐 Configuração de Domínio Customizado

### Frontend (Vercel)

1. No painel do Vercel, acesse seu projeto
2. Vá em **"Settings"** > **"Domains"**
3. Adicione seu domínio (ex: `erp.seudominio.com.br`)
4. Configure os DNS conforme instruções da Vercel

### Backend (Render)

1. No painel do Render, acesse seu Web Service
2. Vá em **"Settings"** > **"Custom Domains"**
3. Adicione seu domínio (ex: `api.seudominio.com.br`)
4. Configure os DNS conforme instruções do Render

---

## 📊 Monitoramento e Logs

### Backend (Render)

- **Logs em tempo real**:
  - Acesse seu Web Service > **"Logs"**

- **Métricas**:
  - Acesse **"Metrics"** para ver uso de CPU, memória, requisições

### Frontend (Vercel)

- **Analytics**:
  - Acesse seu projeto > **"Analytics"**

- **Logs de Deploy**:
  - Acesse **"Deployments"** > Clique em um deploy

### Banco de Dados (Supabase)

- **Monitoramento**:
  - Acesse **"Reports"** no painel do Supabase

- **Logs**:
  - Acesse **"Logs"** > **"Postgres Logs"**

---

## 🔍 Troubleshooting

### Erro: "CORS Policy Blocked"

**Problema**: Frontend não consegue acessar o backend

**Solução**:
1. Verifique se `CORS_ORIGIN` no Render está correto
2. Certifique-se que a URL do frontend está exata (sem `/` no final)
3. Reinicie o serviço no Render

### Erro: "Database Connection Failed"

**Problema**: Backend não conecta ao banco

**Solução**:
1. Verifique as credenciais do Supabase
2. Certifique-se que `DB_SSL=true` está configurado
3. Teste a conexão com:

```bash
psql "postgresql://postgres:[senha]@db.[projeto].supabase.co:5432/postgres"
```

### Erro: "Module not found"

**Problema**: Faltam dependências no deploy

**Solução**:
1. Certifique-se que `package.json` está no diretório `backend`
2. Verifique o **Build Command** no Render
3. Force um novo deploy

### Frontend mostra página em branco

**Problema**: Erro no carregamento do JavaScript

**Solução**:
1. Abra o DevTools do navegador (F12)
2. Verifique erros no Console
3. Verifique se a URL da API está correta em `script.js`

### Backend em "Sleep Mode" (Render Free Tier)

**Problema**: Primeira requisição demora muito

**Solução**:
- Plano gratuito do Render coloca o serviço em sleep após 15 minutos de inatividade
- Primeira requisição pode levar 30-60 segundos
- Considere upgrade para plano pago se necessário

---

## 🔐 Segurança em Produção

### Checklist de Segurança

- [ ] Variáveis de ambiente configuradas corretamente
- [ ] `.env` não está no repositório
- [ ] CORS configurado apenas para domínios permitidos
- [ ] SSL/HTTPS habilitado (automático em Vercel e Render)
- [ ] Senhas fortes no banco de dados
- [ ] Rate limiting ativo no backend
- [ ] Headers de segurança configurados (Helmet)

---

## 🔄 Atualizações e Manutenção

### Deploy Automático

Tanto Vercel quanto Render fazem deploy automático quando você faz push no GitHub:

```bash
git add .
git commit -m "Atualização de feature X"
git push origin main
```

### Rollback

**Vercel**:
1. Acesse **"Deployments"**
2. Encontre o deploy anterior
3. Clique nos três pontos > **"Promote to Production"**

**Render**:
1. Acesse **"Events"**
2. Encontre o deploy anterior
3. Clique em **"Redeploy"**

---

## 📞 Suporte

Em caso de problemas:

1. Verifique os logs das plataformas
2. Consulte a documentação oficial:
   - [Vercel Docs](https://vercel.com/docs)
   - [Render Docs](https://render.com/docs)
   - [Supabase Docs](https://supabase.com/docs)

---

## ✅ Checklist Final

Após o deploy, verifique:

- [ ] Frontend carrega corretamente
- [ ] Dashboard exibe dados (mesmo que zeros)
- [ ] Navegação entre páginas funciona
- [ ] API responde no `/health`
- [ ] Conexão com banco funciona
- [ ] CORS configurado corretamente
- [ ] SSL ativo (HTTPS)
- [ ] Domínio customizado configurado (se aplicável)

---

**Deploy realizado com sucesso!** 🎉

Seu ERP Odisseia está online e pronto para uso!
