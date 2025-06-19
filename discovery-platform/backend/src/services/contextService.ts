import { DiscoveryConfig, ContextData, CodeFile } from '../../../shared/types';
import { githubService } from '../integrations/githubService';
import { googleService } from '../integrations/googleService';
import { figmaService } from '../integrations/figmaService';

export async function collectContext(config: DiscoveryConfig): Promise<ContextData> {
  console.log('Coletando contexto de todas as fontes...');
  
  try {
    const [code, docs, designs] = await Promise.all([
      fetchGitHubCode(config.repositories),
      fetchGoogleDocs(config.googleDocs),
      fetchFigmaDesigns(config.figmaFiles)
    ]);
    
    console.log(`Contexto coletado: ${code.length} arquivos, ${docs.length} documentos, ${designs.length} designs`);
    
    return { code, docs, designs };
  } catch (error) {
    console.error('Erro ao coletar contexto:', error);
    throw new Error(`Falha na coleta de contexto: ${error.message}`);
  }
}

async function fetchGitHubCode(repositories: any[]): Promise<CodeFile[]> {
  if (!repositories.length) {
    console.log('Nenhum repositório selecionado');
    return [];
  }
  
  const allFiles: CodeFile[] = [];
  
  for (const repo of repositories) {
    try {
      console.log(`Coletando código do repositório: ${repo.full_name}`);
      
      const [owner, repoName] = repo.full_name.split('/');
      const files = await githubService.getRepositoryFiles(owner, repoName, repo.paths);
      
      allFiles.push(...files);
    } catch (error) {
      console.error(`Erro ao coletar código do repositório ${repo.full_name}:`, error);
      // Continuar com outros repositórios mesmo se um falhar
    }
  }
  
  return allFiles;
}

async function fetchGoogleDocs(documents: any[]) {
  if (!documents.length) {
    console.log('Nenhum documento selecionado');
    return [];
  }
  
  const docsWithContent = [];
  
  for (const doc of documents) {
    try {
      console.log(`Coletando conteúdo do documento: ${doc.name}`);
      
      const content = await googleService.getDocumentContent(doc.id);
      docsWithContent.push({
        ...doc,
        content
      });
    } catch (error) {
      console.error(`Erro ao coletar documento ${doc.name}:`, error);
      // Adicionar documento sem conteúdo
      docsWithContent.push({
        ...doc,
        content: 'Erro ao carregar conteúdo'
      });
    }
  }
  
  return docsWithContent;
}

async function fetchFigmaDesigns(figmaFiles: any[]) {
  if (!figmaFiles.length) {
    console.log('Nenhum arquivo Figma selecionado');
    return [];
  }
  
  const designsWithDetails = [];
  
  for (const file of figmaFiles) {
    try {
      console.log(`Coletando detalhes do design: ${file.name}`);
      
      const components = await figmaService.getFileComponents(file.key);
      designsWithDetails.push({
        ...file,
        components: components.map(c => c.name),
        flows: file.flows || []
      });
    } catch (error) {
      console.error(`Erro ao coletar design ${file.name}:`, error);
      // Adicionar arquivo sem detalhes extras
      designsWithDetails.push(file);
    }
  }
  
  return designsWithDetails;
}

