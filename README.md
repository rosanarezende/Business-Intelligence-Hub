# Central de Inteligência - Discovery Platform

Uma plataforma web completa para geração de documentação técnica de discovery, agregando informações de múltiplas fontes (GitHub, Google Workspace, Jira, Figma).

## Estrutura do Projeto

```
discovery-platform/
├── frontend/                 # Next.js + TypeScript
├── backend/                  # Node.js + Express + TypeScript
├── shared/                   # Tipos compartilhados
└── README.md
```

## Tecnologias

### Frontend
- React 18 com Vite
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide icons
- React Router DOM

### Backend
- Node.js 20
- Express.js
- TypeScript
- Zod (validação)
- Axios (HTTP client)
- JWT (autenticação)

## Desenvolvimento

### Frontend
```bash
cd frontend
pnpm run dev
```

### Backend
```bash
cd backend
npm run dev
```

## Funcionalidades

- ✅ Estrutura base do projeto
- 🔄 Interface de criação de discovery
- 🔄 Integração com APIs externas
- 🔄 Geração automática via IA
- 🔄 Sistema de templates
- 🔄 Histórico de discoveries

## Deploy

- **Frontend**: Vercel
- **Backend**: Railway/Render

## Contribuição

1. Clone o repositório
2. Instale as dependências
3. Configure as variáveis de ambiente
4. Execute em modo desenvolvimento
5. Faça suas alterações
6. Teste localmente
7. Submeta um PR

