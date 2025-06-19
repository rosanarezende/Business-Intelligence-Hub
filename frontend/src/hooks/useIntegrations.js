import { useState, useEffect } from 'react';
import { integrationsApi } from '../services/api';

export function useIntegrations() {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const result = await integrationsApi.getStatus();
      setStatus(result.data || {});
    } catch (error) {
      console.error('Erro ao buscar status das integrações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const github = {
    getRepositories: async (org, search) => {
      try {
        const result = await integrationsApi.github.getRepositories(org, search);
        return result.data || [];
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        return [];
      }
    },

    getRepositoryFiles: async (owner, repo, paths) => {
      try {
        const result = await integrationsApi.github.getRepositoryFiles(owner, repo, paths);
        return result.data || [];
      } catch (error) {
        console.error('Erro ao buscar arquivos do repositório:', error);
        return [];
      }
    }
  };

  const google = {
    getDocuments: async (search) => {
      try {
        const result = await integrationsApi.google.getDocuments(search);
        return result.data || [];
      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
        return [];
      }
    },

    getDocumentContent: async (id) => {
      try {
        const result = await integrationsApi.google.getDocumentContent(id);
        return result.data || '';
      } catch (error) {
        console.error('Erro ao buscar conteúdo do documento:', error);
        return '';
      }
    }
  };

  const figma = {
    getFiles: async (teamId, search) => {
      try {
        const result = await integrationsApi.figma.getFiles(teamId, search);
        return result.data || [];
      } catch (error) {
        console.error('Erro ao buscar arquivos do Figma:', error);
        return [];
      }
    },

    getFileComponents: async (key) => {
      try {
        const result = await integrationsApi.figma.getFileComponents(key);
        return result.data || [];
      } catch (error) {
        console.error('Erro ao buscar componentes do Figma:', error);
        return [];
      }
    }
  };

  const jira = {
    getProjects: async () => {
      try {
        const result = await integrationsApi.jira.getProjects();
        return result.data || [];
      } catch (error) {
        console.error('Erro ao buscar projetos do Jira:', error);
        return [];
      }
    }
  };

  return {
    status,
    loading,
    fetchStatus,
    github,
    google,
    figma,
    jira
  };
}

