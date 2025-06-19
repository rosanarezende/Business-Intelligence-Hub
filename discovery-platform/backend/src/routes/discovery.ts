import { Router } from 'express';
import { z } from 'zod';
import { generateDiscovery } from '../services/discoveryService';
import { saveDiscovery, getDiscoveries, getDiscoveryById } from '../services/databaseService';

const router = Router();

// Schema de validação para criação de discovery
const createDiscoverySchema = z.object({
  experimentName: z.string().min(1, 'Nome do experimento é obrigatório'),
  responsible: z.string().min(1, 'Responsável é obrigatório'),
  wave: z.string().min(1, 'Wave é obrigatória'),
  prototypeUrl: z.string().url().optional().or(z.literal('')),
  repositories: z.array(z.object({
    id: z.number(),
    name: z.string(),
    full_name: z.string(),
    description: z.string().optional(),
    html_url: z.string(),
    clone_url: z.string(),
    default_branch: z.string(),
    paths: z.array(z.string()),
    language: z.string().optional()
  })),
  googleDocs: z.array(z.object({
    id: z.string(),
    name: z.string(),
    mimeType: z.string(),
    webViewLink: z.string(),
    content: z.string().optional()
  })),
  figmaFiles: z.array(z.object({
    key: z.string(),
    name: z.string(),
    thumbnail_url: z.string().optional(),
    last_modified: z.string(),
    components: z.array(z.string()),
    flows: z.array(z.string())
  })),
  questions: z.array(z.string()),
  aiModel: z.enum(['gpt-4', 'gemini']).optional()
});

// POST /api/discovery - Criar novo discovery
router.post('/', async (req, res) => {
  try {
    const config = createDiscoverySchema.parse(req.body);
    
    console.log('Gerando discovery para:', config.experimentName);
    
    const discovery = await generateDiscovery(config);
    const saved = await saveDiscovery(discovery);
    
    res.json({
      success: true,
      data: saved,
      message: 'Discovery gerado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao gerar discovery:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: error.errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// GET /api/discovery - Listar discoveries
router.get('/', async (req, res) => {
  try {
    const { team, wave, responsible, page = 1, limit = 10 } = req.query;
    
    const filters = {
      team: team as string,
      wave: wave as string,
      responsible: responsible as string
    };
    
    const discoveries = await getDiscoveries(filters, {
      page: parseInt(page as string),
      limit: parseInt(limit as string)
    });
    
    res.json({
      success: true,
      data: discoveries,
      message: 'Discoveries recuperados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar discoveries:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// GET /api/discovery/:id - Buscar discovery por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const discovery = await getDiscoveryById(id);
    
    if (!discovery) {
      return res.status(404).json({
        success: false,
        error: 'Discovery não encontrado'
      });
    }
    
    res.json({
      success: true,
      data: discovery,
      message: 'Discovery encontrado'
    });
  } catch (error) {
    console.error('Erro ao buscar discovery:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// PUT /api/discovery/:id - Atualizar discovery
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Implementar lógica de atualização
    res.json({
      success: true,
      message: 'Funcionalidade de atualização será implementada'
    });
  } catch (error) {
    console.error('Erro ao atualizar discovery:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// DELETE /api/discovery/:id - Deletar discovery
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Implementar lógica de deleção
    res.json({
      success: true,
      message: 'Funcionalidade de deleção será implementada'
    });
  } catch (error) {
    console.error('Erro ao deletar discovery:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

export { router as discoveryRoutes };

