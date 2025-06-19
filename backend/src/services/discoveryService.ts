import { DiscoveryConfig, DiscoveryResult, ContextData } from '../../../shared/types';
import { collectContext } from './contextService';
import { callAI } from './aiService';

export async function generateDiscovery(config: DiscoveryConfig): Promise<DiscoveryResult> {
  try {
    console.log('Iniciando geração de discovery para:', config.experimentName);
    
    // 1. Coletar contexto de todas as fontes
    const context = await collectContext(config);
    
    // 2. Preparar prompt para IA
    const prompt = buildPrompt(context, config);
    
    // 3. Chamar IA (simulado por enquanto)
    const aiResponse = await callAI(prompt, config.aiModel || 'gpt-4');
    
    // 4. Formatar resposta no template
    const content = formatDiscovery(aiResponse, config);
    
    // 5. Criar resultado
    const result: DiscoveryResult = {
      id: 'discovery-' + Date.now(),
      config,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'completed'
    };
    
    console.log('Discovery gerado com sucesso:', result.id);
    return result;
  } catch (error) {
    console.error('Erro ao gerar discovery:', error);
    throw new Error(`Falha na geração do discovery: ${error.message}`);
  }
}

function buildPrompt(context: ContextData, config: DiscoveryConfig): string {
  return `
Você é um arquiteto de software experiente criando um discovery técnico.

CONTEXTO DO EXPERIMENTO: ${config.experimentName}
RESPONSÁVEL: ${config.responsible}
WAVE: ${config.wave}
PROTÓTIPO: ${config.prototypeUrl || 'Não informado'}

CÓDIGO DOS REPOSITÓRIOS:
${context.code.map(file => `
### ${file.path}
\`\`\`${file.language}
${file.content.substring(0, 1000)}${file.content.length > 1000 ? '...' : ''}
\`\`\`
`).join('\n')}

DOCUMENTAÇÃO DA EMPRESA:
${context.docs.map(doc => `
### ${doc.name}
${doc.content?.substring(0, 500) || 'Conteúdo não disponível'}${doc.content && doc.content.length > 500 ? '...' : ''}
`).join('\n')}

DESIGN (FIGMA):
${context.designs.map(design => `
### ${design.name}
- Componentes: ${design.components.join(', ')}
- Fluxos: ${design.flows.join(', ')}
- Última modificação: ${design.last_modified}
`).join('\n')}

DÚVIDAS A ESCLARECER:
${config.questions.map((q, i) => `${i+1}. ${q}`).join('\n')}

Por favor, gere um discovery técnico completo seguindo EXATAMENTE este formato:

## Contexto do Experimento

[Descreva o contexto e objetivos do experimento]

## Análise Técnica

### Arquitetura Atual
[Análise da arquitetura baseada nos repositórios]

### Dependências Identificadas
[Liste dependências entre sistemas e componentes]

### Impactos e Riscos
[Identifique possíveis impactos e riscos técnicos]

## Quebra de Cards

### Card 1: Setup Inicial (PP - 1 dia)
- Configurar estrutura base do projeto
- Implementar feature flag para o experimento
- Configurar ambiente de desenvolvimento

### Card 2: Implementação Core (M - 3 dias)
- Desenvolver funcionalidade principal
- Implementar testes unitários
- Documentar APIs criadas

### Card 3: Integração Frontend (P - 2 dias)
- Conectar com backend
- Implementar interface de usuário
- Testes de integração

### Card 4: Monitoramento (PP - 1 dia)
- Configurar métricas de acompanhamento
- Implementar logs estruturados
- Dashboard de monitoramento

## Critérios de Aceitação

[Liste critérios específicos para validação]

## Próximos Passos

[Defina próximos passos e responsabilidades]

Importante:
- Cada card deve corresponder a um PR
- Usar feature flags sempre
- Cards não devem ter incertezas
- PRs idealmente com 50 linhas (máximo 100)
- Incluir card de monitoramento
- Seguir padrão REST em inglês
- Adicionar T-shirt sizes (PP=1dia, P=2dias, M=3dias, G=4dias)
- Considerar rotina de prevenção de incidentes
`;
}

function formatDiscovery(aiResponse: string, config: DiscoveryConfig): string {
  const timestamp = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `# ${config.experimentName}
## Discovery Técnico e Quebra de Cards

**Responsável técnico:** ${config.responsible}  
**Data de criação:** ${timestamp}  
**Protótipo:** ${config.prototypeUrl || 'Não informado'}  
**Wave:** ${config.wave}

${aiResponse}

---

*Discovery gerado automaticamente pela Central de Inteligência*
`;
}

