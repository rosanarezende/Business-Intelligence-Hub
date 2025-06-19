import axios from 'axios';

class FigmaService {
  private baseURL = 'https://api.figma.com/v1';
  private accessToken: string | undefined;

  constructor() {
    this.accessToken = process.env.FIGMA_ACCESS_TOKEN;
  }

  private getHeaders() {
    return {
      'X-Figma-Token': this.accessToken || '',
      'Content-Type': 'application/json'
    };
  }

  async getFiles(teamId?: string, search?: string): Promise<any[]> {
    try {
      if (!this.accessToken) {
        console.log('Figma token não configurado, retornando dados mock');
        return this.getMockFiles();
      }

      // Em produção, usar Figma API para buscar arquivos do time
      // const response = await axios.get(
      //   `${this.baseURL}/teams/${teamId}/projects`,
      //   { headers: this.getHeaders() }
      // );

      return this.getMockFiles();
    } catch (error) {
      console.error('Erro ao buscar arquivos do Figma:', error);
      return this.getMockFiles();
    }
  }

  async getFileComponents(fileKey: string): Promise<any[]> {
    try {
      if (!this.accessToken) {
        console.log('Figma token não configurado, retornando componentes mock');
        return this.getMockComponents(fileKey);
      }

      // Em produção, usar Figma API
      // const response = await axios.get(
      //   `${this.baseURL}/files/${fileKey}/components`,
      //   { headers: this.getHeaders() }
      // );

      return this.getMockComponents(fileKey);
    } catch (error) {
      console.error('Erro ao buscar componentes do Figma:', error);
      return this.getMockComponents(fileKey);
    }
  }

  async getFileDetails(fileKey: string): Promise<any> {
    try {
      if (!this.accessToken) {
        console.log('Figma token não configurado, retornando detalhes mock');
        return this.getMockFileDetails(fileKey);
      }

      // Em produção, usar Figma API
      // const response = await axios.get(
      //   `${this.baseURL}/files/${fileKey}`,
      //   { headers: this.getHeaders() }
      // );

      return this.getMockFileDetails(fileKey);
    } catch (error) {
      console.error('Erro ao buscar detalhes do arquivo Figma:', error);
      return this.getMockFileDetails(fileKey);
    }
  }

  private getMockFiles() {
    return [
      {
        key: 'abc123def456',
        name: 'Design System - Componentes Mobile',
        thumbnail_url: 'https://via.placeholder.com/200x150/6366f1/ffffff?text=Design+System',
        last_modified: '2024-06-15T10:30:00Z',
        components: ['Button', 'Input', 'Card', 'Modal', 'Navigation'],
        flows: ['Login Flow', 'Onboarding', 'Checkout', 'Profile Setup']
      },
      {
        key: 'def456ghi789',
        name: 'Protótipo - Chat em Tempo Real',
        thumbnail_url: 'https://via.placeholder.com/200x150/10b981/ffffff?text=Chat+Prototype',
        last_modified: '2024-06-14T15:45:00Z',
        components: ['ChatBubble', 'MessageInput', 'UserAvatar', 'StatusIndicator'],
        flows: ['Send Message', 'Receive Message', 'File Upload', 'Voice Message']
      },
      {
        key: 'ghi789jkl012',
        name: 'Wireframes - Dashboard Analytics',
        thumbnail_url: 'https://via.placeholder.com/200x150/f59e0b/ffffff?text=Dashboard',
        last_modified: '2024-06-13T09:20:00Z',
        components: ['Chart', 'KPICard', 'FilterPanel', 'DataTable'],
        flows: ['Data Loading', 'Filter Application', 'Export Data', 'Drill Down']
      },
      {
        key: 'jkl012mno345',
        name: 'Mobile App - Redesign 2024',
        thumbnail_url: 'https://via.placeholder.com/200x150/8b5cf6/ffffff?text=Mobile+App',
        last_modified: '2024-06-12T14:10:00Z',
        components: ['TabBar', 'Header', 'ProductCard', 'SearchBar'],
        flows: ['Product Discovery', 'Purchase Flow', 'User Profile', 'Settings']
      },
      {
        key: 'mno345pqr678',
        name: 'Landing Page - Produto',
        thumbnail_url: 'https://via.placeholder.com/200x150/ef4444/ffffff?text=Landing+Page',
        last_modified: '2024-06-11T11:30:00Z',
        components: ['Hero', 'FeatureCard', 'Testimonial', 'CTA'],
        flows: ['Hero to CTA', 'Feature Exploration', 'Social Proof', 'Contact Form']
      }
    ];
  }

  private getMockComponents(fileKey: string) {
    const componentMap: Record<string, any[]> = {
      'abc123def456': [
        { id: 'comp1', name: 'Button', description: 'Botão primário do sistema' },
        { id: 'comp2', name: 'Input', description: 'Campo de entrada de texto' },
        { id: 'comp3', name: 'Card', description: 'Container para conteúdo' },
        { id: 'comp4', name: 'Modal', description: 'Janela modal sobreposta' },
        { id: 'comp5', name: 'Navigation', description: 'Barra de navegação' }
      ],
      'def456ghi789': [
        { id: 'comp6', name: 'ChatBubble', description: 'Balão de mensagem' },
        { id: 'comp7', name: 'MessageInput', description: 'Campo para digitar mensagem' },
        { id: 'comp8', name: 'UserAvatar', description: 'Avatar do usuário' },
        { id: 'comp9', name: 'StatusIndicator', description: 'Indicador de status online' }
      ],
      'ghi789jkl012': [
        { id: 'comp10', name: 'Chart', description: 'Gráfico de dados' },
        { id: 'comp11', name: 'KPICard', description: 'Card de indicador' },
        { id: 'comp12', name: 'FilterPanel', description: 'Painel de filtros' },
        { id: 'comp13', name: 'DataTable', description: 'Tabela de dados' }
      ]
    };

    return componentMap[fileKey] || [
      { id: 'comp_default', name: 'Component', description: 'Componente genérico' }
    ];
  }

  private getMockFileDetails(fileKey: string) {
    return {
      key: fileKey,
      name: 'Arquivo Figma',
      lastModified: '2024-06-15T10:30:00Z',
      thumbnailUrl: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Figma+File',
      version: '1.0',
      document: {
        id: 'doc1',
        name: 'Document',
        type: 'DOCUMENT',
        children: []
      }
    };
  }
}

export const figmaService = new FigmaService();

