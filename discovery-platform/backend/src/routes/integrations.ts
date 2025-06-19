import { Router } from 'express';
import { githubService } from '../integrations/githubService';
import { googleService } from '../integrations/googleService';
import { figmaService } from '../integrations/figmaService';
import { jiraService } from '../integrations/jiraService';

const router = Router();

// GET /api/integrations/github/repositories - Listar repositórios do GitHub
router.get('/github/repositories', async (req, res) => {
  try {
    const { org, search } = req.query;
    const repositories = await githubService.getRepositories(org as string, search as string);
    
    res.json({
      success: true,
      data: repositories,
      message: 'Repositórios recuperados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar repositórios',
      message: error.message
    });
  }
});

// GET /api/integrations/github/repository/:owner/:repo/files - Listar arquivos de um repositório
router.get('/github/repository/:owner/:repo/files', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { paths } = req.query;
    
    const pathsArray = paths ? (paths as string).split(',') : [];
    const files = await githubService.getRepositoryFiles(owner, repo, pathsArray);
    
    res.json({
      success: true,
      data: files,
      message: 'Arquivos recuperados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar arquivos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar arquivos',
      message: error.message
    });
  }
});

// GET /api/integrations/google/documents - Listar documentos do Google Drive
router.get('/google/documents', async (req, res) => {
  try {
    const { search } = req.query;
    const documents = await googleService.getDocuments(search as string);
    
    res.json({
      success: true,
      data: documents,
      message: 'Documentos recuperados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar documentos',
      message: error.message
    });
  }
});

// GET /api/integrations/google/document/:id/content - Obter conteúdo de um documento
router.get('/google/document/:id/content', async (req, res) => {
  try {
    const { id } = req.params;
    const content = await googleService.getDocumentContent(id);
    
    res.json({
      success: true,
      data: content,
      message: 'Conteúdo recuperado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar conteúdo:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar conteúdo',
      message: error.message
    });
  }
});

// GET /api/integrations/figma/files - Listar arquivos do Figma
router.get('/figma/files', async (req, res) => {
  try {
    const { team_id, search } = req.query;
    const files = await figmaService.getFiles(team_id as string, search as string);
    
    res.json({
      success: true,
      data: files,
      message: 'Arquivos do Figma recuperados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar arquivos do Figma:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar arquivos do Figma',
      message: error.message
    });
  }
});

// GET /api/integrations/figma/file/:key/components - Obter componentes de um arquivo Figma
router.get('/figma/file/:key/components', async (req, res) => {
  try {
    const { key } = req.params;
    const components = await figmaService.getFileComponents(key);
    
    res.json({
      success: true,
      data: components,
      message: 'Componentes recuperados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar componentes:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar componentes',
      message: error.message
    });
  }
});

// GET /api/integrations/jira/projects - Listar projetos do Jira
router.get('/jira/projects', async (req, res) => {
  try {
    const projects = await jiraService.getProjects();
    
    res.json({
      success: true,
      data: projects,
      message: 'Projetos do Jira recuperados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar projetos do Jira:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar projetos do Jira',
      message: error.message
    });
  }
});

// GET /api/integrations/status - Verificar status das integrações
router.get('/status', async (req, res) => {
  try {
    const status = {
      github: {
        connected: !!process.env.GITHUB_TOKEN,
        status: process.env.GITHUB_TOKEN ? 'connected' : 'disconnected'
      },
      google: {
        connected: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
        status: (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) ? 'connected' : 'disconnected'
      },
      figma: {
        connected: !!process.env.FIGMA_ACCESS_TOKEN,
        status: process.env.FIGMA_ACCESS_TOKEN ? 'connected' : 'disconnected'
      },
      jira: {
        connected: !!process.env.JIRA_API_TOKEN,
        status: process.env.JIRA_API_TOKEN ? 'connected' : 'disconnected'
      }
    };
    
    res.json({
      success: true,
      data: status,
      message: 'Status das integrações recuperado'
    });
  } catch (error) {
    console.error('Erro ao verificar status:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao verificar status',
      message: error.message
    });
  }
});

export { router as integrationRoutes };

