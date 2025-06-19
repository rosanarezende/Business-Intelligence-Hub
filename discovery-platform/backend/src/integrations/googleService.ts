import axios from 'axios';

class GoogleService {
  private baseURL = 'https://www.googleapis.com';
  private clientId: string | undefined;
  private clientSecret: string | undefined;

  constructor() {
    this.clientId = process.env.GOOGLE_CLIENT_ID;
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  }

  async getDocuments(search?: string): Promise<any[]> {
    try {
      if (!this.clientId || !this.clientSecret) {
        console.log('Google credentials não configuradas, retornando dados mock');
        return this.getMockDocuments();
      }

      // Em produção, implementar OAuth2 flow completo
      // Por enquanto, retornar dados mock
      return this.getMockDocuments();
    } catch (error) {
      console.error('Erro ao buscar documentos do Google:', error);
      return this.getMockDocuments();
    }
  }

  async getDocumentContent(documentId: string): Promise<string> {
    try {
      if (!this.clientId || !this.clientSecret) {
        console.log('Google credentials não configuradas, retornando conteúdo mock');
        return this.getMockDocumentContent(documentId);
      }

      // Em produção, usar Google Docs API
      // const response = await axios.get(
      //   `${this.baseURL}/docs/v1/documents/${documentId}`,
      //   { headers: { Authorization: `Bearer ${accessToken}` } }
      // );

      return this.getMockDocumentContent(documentId);
    } catch (error) {
      console.error('Erro ao buscar conteúdo do documento:', error);
      return 'Erro ao carregar conteúdo do documento';
    }
  }

  private getMockDocuments() {
    return [
      {
        id: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        name: 'Playbook de Engenharia - Tribo Mobile',
        mimeType: 'application/vnd.google-apps.document',
        webViewLink: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
        modifiedTime: '2024-06-15T10:30:00Z',
        owners: [{ displayName: 'Equipe Engenharia' }]
      },
      {
        id: '1mGVIs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        name: 'Padrões de Nomenclatura - Analytics',
        mimeType: 'application/vnd.google-apps.document',
        webViewLink: 'https://docs.google.com/document/d/1mGVIs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
        modifiedTime: '2024-06-14T15:20:00Z',
        owners: [{ displayName: 'Equipe Analytics' }]
      },
      {
        id: '1nHWJs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        name: 'Guia de Prevenção de Incidentes',
        mimeType: 'application/vnd.google-apps.document',
        webViewLink: 'https://docs.google.com/document/d/1nHWJs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
        modifiedTime: '2024-06-13T09:45:00Z',
        owners: [{ displayName: 'Equipe SRE' }]
      },
      {
        id: '1oIXKs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        name: 'OKRs Q1 2024 - Produto',
        mimeType: 'application/vnd.google-apps.spreadsheet',
        webViewLink: 'https://docs.google.com/spreadsheets/d/1oIXKs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
        modifiedTime: '2024-06-12T14:30:00Z',
        owners: [{ displayName: 'Equipe Produto' }]
      },
      {
        id: '1pJYLs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        name: 'Arquitetura de Microserviços',
        mimeType: 'application/vnd.google-apps.document',
        webViewLink: 'https://docs.google.com/document/d/1pJYLs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
        modifiedTime: '2024-06-11T11:15:00Z',
        owners: [{ displayName: 'Arquitetura' }]
      }
    ];
  }

  private getMockDocumentContent(documentId: string): string {
    const contentMap: Record<string, string> = {
      '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms': `# Playbook de Engenharia - Tribo Mobile

## Padrões de Desenvolvimento

### Estrutura de Projetos
- Utilizar arquitetura modular
- Separação clara entre camadas (presentation, business, data)
- Implementar dependency injection

### Padrões de Código
- Seguir convenções de nomenclatura
- Implementar testes unitários (cobertura mínima 80%)
- Code review obrigatório para todos os PRs

### Processo de Deploy
- Feature flags para todas as novas funcionalidades
- Deploy gradual (canary deployment)
- Rollback automático em caso de falhas

### Monitoramento
- Logs estruturados em JSON
- Métricas de performance e negócio
- Alertas proativos para cenários críticos`,

      '1mGVIs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms': `# Padrões de Nomenclatura - Analytics

## Eventos de Analytics

### Convenções Gerais
- Usar snake_case para nomes de eventos
- Prefixar com área de negócio (user_, product_, payment_)
- Incluir versão do evento (v1, v2, etc.)

### Propriedades
- Usar camelCase para propriedades
- Incluir timestamp em UTC
- Adicionar userId quando aplicável

### Exemplos
- user_login_v1
- product_view_v2
- payment_completed_v1

### Validação
- Schema validation obrigatória
- Testes automatizados para eventos críticos`,

      '1nHWJs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms': `# Guia de Prevenção de Incidentes

## Práticas Preventivas

### Desenvolvimento
- Code review rigoroso
- Testes automatizados abrangentes
- Análise estática de código

### Deploy
- Ambiente de staging idêntico à produção
- Testes de carga antes do deploy
- Deploy gradual com monitoramento

### Monitoramento
- SLIs e SLOs bem definidos
- Alertas baseados em sintomas
- Runbooks atualizados

### Resposta a Incidentes
- Processo de escalação claro
- Comunicação transparente
- Post-mortem sem culpa`,

      '1oIXKs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms': `# OKRs Q1 2024 - Produto

## Objetivo 1: Melhorar Experiência do Usuário
- KR1: Reduzir tempo de carregamento em 30%
- KR2: Aumentar NPS para 8.5
- KR3: Reduzir taxa de abandono em 25%

## Objetivo 2: Aumentar Engajamento
- KR1: Aumentar DAU em 20%
- KR2: Aumentar tempo de sessão em 15%
- KR3: Implementar 3 novas funcionalidades

## Objetivo 3: Otimizar Conversão
- KR1: Aumentar taxa de conversão em 18%
- KR2: Reduzir CAC em 12%
- KR3: Implementar A/B tests em 5 fluxos críticos`,

      '1pJYLs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms': `# Arquitetura de Microserviços

## Princípios Arquiteturais

### Separação de Responsabilidades
- Cada serviço tem uma responsabilidade específica
- Baixo acoplamento entre serviços
- Alta coesão dentro do serviço

### Comunicação
- APIs REST para comunicação síncrona
- Message queues para comunicação assíncrona
- Circuit breakers para resiliência

### Dados
- Database per service
- Event sourcing para auditoria
- CQRS quando necessário

### Observabilidade
- Distributed tracing
- Centralized logging
- Metrics collection`
    };

    return contentMap[documentId] || 'Conteúdo do documento não disponível no mock.';
  }
}

export const googleService = new GoogleService();

