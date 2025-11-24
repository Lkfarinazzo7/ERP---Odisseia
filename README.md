# ERP Odisseia

Sistema ERP moderno e completo desenvolvido com as tecnologias mais atuais do mercado.

## Stack Tecnológica

### Backend
- **Node.js** com **TypeScript**
- **Express** - Framework web
- **Prisma** - ORM para PostgreSQL
- **JWT** - Autenticação
- **Zod** - Validação de dados
- **bcryptjs** - Hash de senhas

### Frontend
- **React** com **TypeScript**
- **Vite** - Build tool
- **React Router** - Roteamento
- **Zustand** - Gerenciamento de estado
- **Axios** - Cliente HTTP

### Database
- **PostgreSQL 16** - Banco de dados relacional

### DevOps
- **Docker** & **Docker Compose**

## Funcionalidades

### Autenticação
- Login e cadastro de usuários
- Autenticação JWT com tokens de 7 dias
- Controle de permissões (admin/user)

### Dashboard
- Visão geral do sistema
- Estatísticas de produtos
- Total de vendas e receita
- Alertas de estoque baixo

### Gestão de Produtos
- CRUD completo de produtos
- Controle de estoque
- Gestão de preços (venda e custo)
- Sistema de SKU único
- Soft delete (produtos inativos)

### Gestão de Vendas
- Criação de vendas com múltiplos itens
- Carrinho de compras
- Atualização automática de estoque
- Cancelamento de vendas (devolve estoque)
- Histórico completo de vendas

## Requisitos

- **Docker** e **Docker Compose** instalados
- Ou: **Node.js 20+** e **PostgreSQL 16+**

## Instalação e Execução

### Opção 1: Com Docker (Recomendado)

1. Clone o repositório:
```bash
git clone <url-do-repo>
cd ERP---Odisseia
```

2. Inicie todos os serviços:
```bash
docker-compose up -d
```

3. Aguarde alguns segundos para os serviços iniciarem. Acesse:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Database**: localhost:5432

### Opção 2: Instalação Manual

#### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Execute as migrations do banco:
```bash
npx prisma migrate dev
```

5. Inicie o servidor:
```bash
npm run dev
```

#### Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Estrutura do Projeto

```
ERP---Odisseia/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma      # Schema do banco de dados
│   ├── src/
│   │   ├── middleware/        # Middlewares (auth)
│   │   ├── routes/            # Rotas da API
│   │   └── server.ts          # Servidor Express
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── services/          # Cliente API
│   │   ├── store/             # Estado global (Zustand)
│   │   ├── App.tsx            # Componente raiz
│   │   └── main.tsx           # Entry point
│   ├── Dockerfile
│   └── package.json
├── database/
├── docker-compose.yml
└── README.md
```

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Cadastrar usuário
- `POST /api/auth/login` - Login

### Usuários
- `GET /api/users/me` - Dados do usuário logado
- `GET /api/users` - Listar usuários (admin)

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Buscar produto
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto (soft delete)

### Vendas
- `GET /api/sales` - Listar vendas
- `GET /api/sales/:id` - Buscar venda
- `POST /api/sales` - Criar venda
- `PATCH /api/sales/:id/cancel` - Cancelar venda

## Credenciais de Teste

Após iniciar o sistema, faça o cadastro através da tela de login.

## Scripts Úteis

### Backend
```bash
npm run dev              # Modo desenvolvimento
npm run build            # Build para produção
npm start                # Executar produção
npm run prisma:migrate   # Executar migrations
npm run prisma:studio    # Interface visual do banco
```

### Frontend
```bash
npm run dev              # Modo desenvolvimento
npm run build            # Build para produção
npm run preview          # Preview do build
```

## Variáveis de Ambiente

### Backend (.env)
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/erp_odisseia?schema=public"
JWT_SECRET="seu-secret-super-seguro-aqui"
PORT=3001
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## Desenvolvimento

### Adicionar nova migration
```bash
cd backend
npx prisma migrate dev --name nome_da_migration
```

### Resetar banco de dados
```bash
cd backend
npx prisma migrate reset
```

### Ver banco de dados
```bash
cd backend
npx prisma studio
```

## Produção

### Build

1. Backend:
```bash
cd backend
npm run build
```

2. Frontend:
```bash
cd frontend
npm run build
```

### Deploy com Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Suporte

Para reportar bugs ou solicitar features, abra uma issue no repositório.
