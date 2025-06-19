import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Configurar axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const discoveryApi = {
  // Criar novo discovery
  create: async (config) => {
    const response = await api.post('/discovery', config);
    return response.data;
  },

  // Listar discoveries
  list: async (filters = {}, pagination = { page: 1, limit: 10 }) => {
    const params = { ...filters, ...pagination };
    const response = await api.get('/discovery', { params });
    return response.data;
  },

  // Buscar discovery por ID
  getById: async (id) => {
    const response = await api.get(`/discovery/${id}`);
    return response.data;
  },

  // Atualizar discovery
  update: async (id, updates) => {
    const response = await api.put(`/discovery/${id}`, updates);
    return response.data;
  },

  // Deletar discovery
  delete: async (id) => {
    const response = await api.delete(`/discovery/${id}`);
    return response.data;
  }
};

export const authApi = {
  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
    }
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
    return response.data;
  },

  // Obter dados do usuário atual
  me: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export const integrationsApi = {
  // GitHub
  github: {
    getRepositories: async (org, search) => {
      const params = { org, search };
      const response = await api.get('/integrations/github/repositories', { params });
      return response.data;
    },

    getRepositoryFiles: async (owner, repo, paths) => {
      const pathsParam = paths ? paths.join(',') : '';
      const response = await api.get(`/integrations/github/repository/${owner}/${repo}/files`, {
        params: { paths: pathsParam }
      });
      return response.data;
    }
  },

  // Google Workspace
  google: {
    getDocuments: async (search) => {
      const response = await api.get('/integrations/google/documents', {
        params: { search }
      });
      return response.data;
    },

    getDocumentContent: async (id) => {
      const response = await api.get(`/integrations/google/document/${id}/content`);
      return response.data;
    }
  },

  // Figma
  figma: {
    getFiles: async (teamId, search) => {
      const params = { team_id: teamId, search };
      const response = await api.get('/integrations/figma/files', { params });
      return response.data;
    },

    getFileComponents: async (key) => {
      const response = await api.get(`/integrations/figma/file/${key}/components`);
      return response.data;
    }
  },

  // Jira
  jira: {
    getProjects: async () => {
      const response = await api.get('/integrations/jira/projects');
      return response.data;
    }
  },

  // Status das integrações
  getStatus: async () => {
    const response = await api.get('/integrations/status');
    return response.data;
  }
};

export default api;

