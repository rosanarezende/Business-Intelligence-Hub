import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

// POST /api/auth/login - Login básico (mock)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Mock de autenticação - em produção, validar credenciais reais
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email e senha são obrigatórios'
      });
    }
    
    // Simular usuário válido
    const user = {
      id: '1',
      name: 'Usuário Demo',
      email: email,
      avatar: 'https://via.placeholder.com/40x40/6366f1/ffffff?text=U'
    };
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      data: {
        user,
        token
      },
      message: 'Login realizado com sucesso'
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// GET /api/auth/me - Obter dados do usuário atual
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token de acesso não fornecido'
      });
    }
    
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret') as any;
    
    // Mock de dados do usuário
    const user = {
      id: decoded.userId,
      name: 'Usuário Demo',
      email: decoded.email,
      avatar: 'https://via.placeholder.com/40x40/6366f1/ffffff?text=U',
      tokens: {
        github: process.env.GITHUB_TOKEN ? 'Conectado' : null,
        google: process.env.GOOGLE_CLIENT_ID ? 'Conectado' : null,
        jira: process.env.JIRA_API_TOKEN ? 'Conectado' : null,
        figma: process.env.FIGMA_ACCESS_TOKEN ? 'Conectado' : null
      }
    };
    
    res.json({
      success: true,
      data: user,
      message: 'Dados do usuário recuperados'
    });
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(401).json({
      success: false,
      error: 'Token inválido'
    });
  }
});

// POST /api/auth/logout - Logout
router.post('/logout', async (req, res) => {
  try {
    // Em uma implementação real, invalidar o token
    res.json({
      success: true,
      message: 'Logout realizado com sucesso'
    });
  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

export { router as authRoutes };

