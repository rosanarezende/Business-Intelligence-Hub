import { DiscoveryResult, SearchFilters } from '../../../shared/types';

// Simulação de banco de dados em memória
const discoveries: DiscoveryResult[] = [];

export async function saveDiscovery(discovery: DiscoveryResult): Promise<DiscoveryResult> {
  console.log('Salvando discovery:', discovery.id);
  
  // Simular salvamento em banco de dados
  discoveries.push(discovery);
  
  return discovery;
}

export async function getDiscoveries(
  filters: SearchFilters, 
  pagination: { page: number; limit: number }
): Promise<{ items: DiscoveryResult[]; total: number; page: number; limit: number }> {
  console.log('Buscando discoveries com filtros:', filters);
  
  let filteredDiscoveries = [...discoveries];
  
  // Aplicar filtros
  if (filters.team) {
    filteredDiscoveries = filteredDiscoveries.filter(d => 
      d.config.responsible.toLowerCase().includes(filters.team.toLowerCase())
    );
  }
  
  if (filters.wave) {
    filteredDiscoveries = filteredDiscoveries.filter(d => 
      d.config.wave.toLowerCase().includes(filters.wave.toLowerCase())
    );
  }
  
  if (filters.responsible) {
    filteredDiscoveries = filteredDiscoveries.filter(d => 
      d.config.responsible.toLowerCase().includes(filters.responsible.toLowerCase())
    );
  }
  
  if (filters.dateFrom) {
    filteredDiscoveries = filteredDiscoveries.filter(d => 
      new Date(d.createdAt) >= filters.dateFrom!
    );
  }
  
  if (filters.dateTo) {
    filteredDiscoveries = filteredDiscoveries.filter(d => 
      new Date(d.createdAt) <= filters.dateTo!
    );
  }
  
  // Ordenar por data de criação (mais recente primeiro)
  filteredDiscoveries.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Aplicar paginação
  const startIndex = (pagination.page - 1) * pagination.limit;
  const endIndex = startIndex + pagination.limit;
  const paginatedItems = filteredDiscoveries.slice(startIndex, endIndex);
  
  return {
    items: paginatedItems,
    total: filteredDiscoveries.length,
    page: pagination.page,
    limit: pagination.limit
  };
}

export async function getDiscoveryById(id: string): Promise<DiscoveryResult | null> {
  console.log('Buscando discovery por ID:', id);
  
  const discovery = discoveries.find(d => d.id === id);
  return discovery || null;
}

export async function updateDiscovery(id: string, updates: Partial<DiscoveryResult>): Promise<DiscoveryResult | null> {
  console.log('Atualizando discovery:', id);
  
  const index = discoveries.findIndex(d => d.id === id);
  if (index === -1) {
    return null;
  }
  
  discoveries[index] = {
    ...discoveries[index],
    ...updates,
    updatedAt: new Date()
  };
  
  return discoveries[index];
}

export async function deleteDiscovery(id: string): Promise<boolean> {
  console.log('Deletando discovery:', id);
  
  const index = discoveries.findIndex(d => d.id === id);
  if (index === -1) {
    return false;
  }
  
  discoveries.splice(index, 1);
  return true;
}

// Função para popular dados de exemplo (desenvolvimento)
export function seedDatabase() {
  if (discoveries.length === 0) {
    console.log('Populando banco com dados de exemplo...');
    
    const mockDiscovery: DiscoveryResult = {
      id: 'discovery-example-1',
      config: {
        experimentName: 'Sistema de Chat em Tempo Real',
        responsible: 'João Silva',
        wave: 'Q1 2024',
        prototypeUrl: 'https://figma.com/proto/example',
        repositories: [
          {
            id: 1,
            name: 'chat-frontend',
            full_name: 'empresa/chat-frontend',
            description: 'Frontend React para sistema de chat',
            html_url: 'https://github.com/empresa/chat-frontend',
            clone_url: 'https://github.com/empresa/chat-frontend.git',
            default_branch: 'main',
            paths: ['src/components', 'src/services'],
            language: 'TypeScript'
          }
        ],
        googleDocs: [
          {
            id: 'doc-1',
            name: 'Especificação do Chat',
            mimeType: 'application/vnd.google-apps.document',
            webViewLink: 'https://docs.google.com/document/d/example',
            content: 'Especificação técnica do sistema de chat...'
          }
        ],
        figmaFiles: [
          {
            key: 'figma-1',
            name: 'Design do Chat',
            thumbnail_url: 'https://via.placeholder.com/200x150',
            last_modified: '2024-06-15T10:30:00Z',
            components: ['ChatBubble', 'MessageInput'],
            flows: ['Send Message', 'Receive Message']
          }
        ],
        questions: [
          'Como garantir a escalabilidade do sistema?',
          'Qual estratégia de cache utilizar?'
        ]
      },
      content: '# Sistema de Chat em Tempo Real\n\nDiscovery técnico exemplo...',
      createdAt: new Date('2024-06-15T10:00:00Z'),
      updatedAt: new Date('2024-06-15T10:00:00Z'),
      status: 'completed'
    };
    
    discoveries.push(mockDiscovery);
  }
}

