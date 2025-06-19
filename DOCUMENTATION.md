# Central de Inteligência - Discovery Platform

## 🎯 Visão Geral

A **Central de Inteligência** é uma plataforma web completa que agrega informações de múltiplas fontes (GitHub, Google Workspace, Jira, Figma) para gerar documentação técnica de discovery holística e contextualizada.

## ✨ Funcionalidades Principais

### 🔍 Geração Automática de Discovery
- Análise contextualizada de múltiplas fontes de dados
- Geração automática via IA (OpenAI GPT-4 / Google Gemini)
- Quebra automática em cards acionáveis
- Templates reutilizáveis

### 🔗 Integrações Completas
- **GitHub**: Análise de repositórios e código
- **Google Workspace**: Documentos, planilhas e apresentações
- **Figma**: Designs, protótipos e componentes
- **Jira**: Projetos, issues e histórico

### 🎨 Interface Moderna
- Design responsivo e acessível
- Componentes reutilizáveis com shadcn/ui
- Navegação intuitiva
- Experiência otimizada para desktop e mobile

## 🏗️ Arquitetura Técnica

### Frontend
- **Framework**: React 18 com Vite
- **Linguagem**: JavaScript (JSX)
- **Styling**: Tailwind CSS
- **Componentes**: shadcn/ui
- **Ícones**: Lucide React
- **Roteamento**: React Router DOM
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **Validação**: Zod
- **Autenticação**: JWT
- **HTTP Client**: Axios
- **CORS**: Habilitado para integração frontend-backend

### Integrações
- **GitHub API**: Acesso a repositórios e análise de código
- **Google APIs**: Google Drive, Docs, Sheets
- **Figma API**: Arquivos, componentes e protótipos
- **Jira API**: Projetos, issues e workflows
- **IA**: OpenAI GPT-4 e Google Gemini

## 📁 Estrutura do Projeto

```
discovery-platform/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   │   ├── ui/          # Componentes base (shadcn/ui)
│   │   │   ├── Header.jsx   # Cabeçalho da aplicação
│   │   │   ├── Sidebar.jsx  # Navegação lateral
│   │   │   ├── RepositorySelector.jsx
│   │   │   ├── DocumentSelector.jsx
│   │   │   ├── FigmaSelector.jsx
│   │   │   ├── QuestionsList.jsx
│   │   │   └── DiscoveryResult.jsx
│   │   ├── pages/           # Páginas da aplicação
│   │   │   ├── HomePage.jsx
│   │   │   ├── NewDiscoveryPage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   └── TemplatesPage.jsx
│   │   ├── hooks/           # Hooks personalizados
│   │   │   ├── useDiscovery.js
│   │   │   └── useIntegrations.js
│   │   ├── services/        # Clientes de API
│   │   │   └── api.js
│   │   └── lib/             # Utilitários
│   ├── public/              # Assets estáticos
│   └── package.json
├── backend/                  # Servidor Node.js
│   ├── src/
│   │   ├── routes/          # Rotas da API
│   │   │   ├── discovery.ts
│   │   │   ├── auth.ts
│   │   │   └── integrations.ts
│   │   ├── services/        # Lógica de negócio
│   │   │   ├── discoveryService.ts
│   │   │   ├── contextService.ts
│   │   │   ├── aiService.ts
│   │   │   └── databaseService.ts
│   │   ├── integrations/    # APIs externas
│   │   │   ├── githubService.ts
│   │   │   ├── googleService.ts
│   │   │   ├── figmaService.ts
│   │   │   └── jiraService.ts
│   │   ├── middleware/      # Middlewares Express
│   │   │   ├── auth.ts
│   │   │   └── common.ts
│   │   └── index.ts         # Servidor principal
│   └── package.json
├── shared/                   # Tipos compartilhados
│   └── types.ts
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+
- npm ou pnpm

### 1. Configuração do Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurar variáveis de ambiente no .env
npm run dev
```

### 2. Configuração do Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

### 3. Acessar a Aplicação

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## ⚙️ Configuração

### Variáveis de Ambiente (Backend)

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_here

# Tokens de API
GITHUB_TOKEN=your_github_token_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
JIRA_API_TOKEN=your_jira_token_here
FIGMA_ACCESS_TOKEN=your_figma_token_here

# IA
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here
```

### Variáveis de Ambiente (Frontend)

```env
VITE_API_URL=http://localhost:3001/api
```

## 📋 APIs Disponíveis

### Discovery
- `POST /api/discovery` - Criar novo discovery
- `GET /api/discovery` - Listar discoveries
- `GET /api/discovery/:id` - Buscar discovery por ID
- `PUT /api/discovery/:id` - Atualizar discovery
- `DELETE /api/discovery/:id` - Deletar discovery

### Autenticação
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário atual
- `POST /api/auth/logout` - Logout

### Integrações
- `GET /api/integrations/github/repositories` - Listar repositórios
- `GET /api/integrations/google/documents` - Listar documentos
- `GET /api/integrations/figma/files` - Listar arquivos Figma
- `GET /api/integrations/jira/projects` - Listar projetos Jira
- `GET /api/integrations/status` - Status das integrações

## 🎨 Componentes Principais

### RepositorySelector
Componente para seleção e configuração de repositórios GitHub:
- Busca de repositórios por organização
- Seleção de paths específicos
- Visualização de metadados (linguagem, stars, forks)

### DocumentSelector
Componente para seleção de documentos do Google Workspace:
- Busca de documentos por nome
- Suporte a diferentes tipos (Docs, Sheets, Slides)
- Preview de metadados

### FigmaSelector
Componente para seleção de arquivos Figma:
- Visualização de thumbnails
- Lista de componentes e fluxos
- Informações de última modificação

### DiscoveryResult
Componente para exibição e gestão de discoveries gerados:
- Visualização em Markdown
- Opções de exportação (MD, PDF)
- Integração com Jira para criação de cards
- Funcionalidades de edição e compartilhamento

## 🔄 Fluxo de Funcionamento

1. **Configuração**: Usuário preenche informações básicas do experimento
2. **Seleção de Fontes**: Escolha de repositórios, documentos e designs
3. **Contextualização**: Sistema coleta e agrega informações de todas as fontes
4. **Geração**: IA processa contexto e gera discovery estruturado
5. **Entrega**: Discovery apresentado com opções de exportação e ação

## 🎯 Benefícios

### Para Desenvolvedores
- Discovery técnico completo e contextualizado
- Quebra automática em cards acionáveis
- Consideração de padrões da empresa
- Redução significativa do tempo de análise

### Para PMs e Stakeholders
- Interface amigável e acessível
- Visibilidade completa do processo técnico
- Histórico centralizado de discoveries
- Melhor alinhamento entre times técnicos e de negócio

### Para a Organização
- Conhecimento centralizado e estruturado
- Padrões documentados e reutilizáveis
- Processo escalável e consistente
- Redução de retrabalho e inconsistências

## 🚀 Deploy

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy via Vercel CLI ou GitHub integration
```

### Backend (Railway/Render)
```bash
cd backend
npm run build
# Deploy via Railway/Render
```

## 🔮 Próximos Passos

1. **Integração com IA Real**: Implementar chamadas para OpenAI/Gemini
2. **Autenticação OAuth**: Implementar OAuth2 para integrações
3. **Banco de Dados**: Migrar de mock para banco real (PostgreSQL)
4. **Templates Avançados**: Sistema de templates personalizáveis
5. **Colaboração**: Funcionalidades de comentários e revisão
6. **Analytics**: Métricas de uso e efetividade
7. **Mobile App**: Aplicativo mobile nativo

## 🤝 Contribuição

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

Desenvolvido pela equipe Manus AI com foco em automação inteligente de processos de discovery técnico.

---

**Central de Inteligência** - Transformando a forma como equipes técnicas criam e gerenciam documentação de discovery. 🚀

