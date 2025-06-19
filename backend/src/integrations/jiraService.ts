import axios from 'axios';

class JiraService {
  private baseURL: string;
  private apiToken: string | undefined;
  private email: string | undefined;

  constructor() {
    this.baseURL = process.env.JIRA_BASE_URL || 'https://your-domain.atlassian.net';
    this.apiToken = process.env.JIRA_API_TOKEN;
    this.email = process.env.JIRA_EMAIL;
  }

  private getHeaders() {
    if (!this.apiToken || !this.email) {
      return {};
    }

    const auth = Buffer.from(`${this.email}:${this.apiToken}`).toString('base64');
    return {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  async getProjects(): Promise<any[]> {
    try {
      if (!this.apiToken || !this.email) {
        console.log('Jira credentials não configuradas, retornando dados mock');
        return this.getMockProjects();
      }

      // Em produção, usar Jira API
      // const response = await axios.get(
      //   `${this.baseURL}/rest/api/3/project`,
      //   { headers: this.getHeaders() }
      // );

      return this.getMockProjects();
    } catch (error) {
      console.error('Erro ao buscar projetos do Jira:', error);
      return this.getMockProjects();
    }
  }

  async getIssues(projectKey: string, jql?: string): Promise<any[]> {
    try {
      if (!this.apiToken || !this.email) {
        console.log('Jira credentials não configuradas, retornando issues mock');
        return this.getMockIssues(projectKey);
      }

      const searchJql = jql || `project = ${projectKey} ORDER BY created DESC`;
      
      // Em produção, usar Jira API
      // const response = await axios.get(
      //   `${this.baseURL}/rest/api/3/search`,
      //   {
      //     headers: this.getHeaders(),
      //     params: { jql: searchJql, maxResults: 50 }
      //   }
      // );

      return this.getMockIssues(projectKey);
    } catch (error) {
      console.error('Erro ao buscar issues do Jira:', error);
      return this.getMockIssues(projectKey);
    }
  }

  async createIssue(projectKey: string, issueData: any): Promise<any> {
    try {
      if (!this.apiToken || !this.email) {
        console.log('Jira credentials não configuradas, simulando criação de issue');
        return this.getMockCreatedIssue(projectKey, issueData);
      }

      // Em produção, usar Jira API
      // const response = await axios.post(
      //   `${this.baseURL}/rest/api/3/issue`,
      //   issueData,
      //   { headers: this.getHeaders() }
      // );

      return this.getMockCreatedIssue(projectKey, issueData);
    } catch (error) {
      console.error('Erro ao criar issue no Jira:', error);
      throw new Error('Falha ao criar issue no Jira');
    }
  }

  async getIssueTypes(projectKey: string): Promise<any[]> {
    try {
      if (!this.apiToken || !this.email) {
        return this.getMockIssueTypes();
      }

      // Em produção, usar Jira API
      // const response = await axios.get(
      //   `${this.baseURL}/rest/api/3/project/${projectKey}/issuetypes`,
      //   { headers: this.getHeaders() }
      // );

      return this.getMockIssueTypes();
    } catch (error) {
      console.error('Erro ao buscar tipos de issue:', error);
      return this.getMockIssueTypes();
    }
  }

  private getMockProjects() {
    return [
      {
        id: '10001',
        key: 'DISC',
        name: 'Discovery Platform',
        description: 'Projeto para gerenciar discoveries técnicos',
        projectTypeKey: 'software',
        lead: {
          displayName: 'Tech Lead',
          emailAddress: 'tech.lead@empresa.com'
        }
      },
      {
        id: '10002',
        key: 'MOBILE',
        name: 'Mobile App',
        description: 'Desenvolvimento do aplicativo mobile',
        projectTypeKey: 'software',
        lead: {
          displayName: 'Mobile Lead',
          emailAddress: 'mobile.lead@empresa.com'
        }
      },
      {
        id: '10003',
        key: 'BACKEND',
        name: 'Backend Services',
        description: 'Serviços de backend e APIs',
        projectTypeKey: 'software',
        lead: {
          displayName: 'Backend Lead',
          emailAddress: 'backend.lead@empresa.com'
        }
      }
    ];
  }

  private getMockIssues(projectKey: string) {
    return [
      {
        id: '10101',
        key: `${projectKey}-1`,
        summary: 'Implementar autenticação OAuth2',
        description: 'Adicionar suporte a autenticação OAuth2 para integração com serviços externos',
        status: { name: 'To Do' },
        priority: { name: 'High' },
        issueType: { name: 'Story' },
        assignee: { displayName: 'João Silva' },
        created: '2024-06-15T10:00:00Z'
      },
      {
        id: '10102',
        key: `${projectKey}-2`,
        summary: 'Otimizar performance da API',
        description: 'Melhorar tempo de resposta das APIs principais',
        status: { name: 'In Progress' },
        priority: { name: 'Medium' },
        issueType: { name: 'Task' },
        assignee: { displayName: 'Maria Santos' },
        created: '2024-06-14T15:30:00Z'
      },
      {
        id: '10103',
        key: `${projectKey}-3`,
        summary: 'Bug: Erro na validação de formulário',
        description: 'Formulário não valida campos obrigatórios corretamente',
        status: { name: 'Done' },
        priority: { name: 'High' },
        issueType: { name: 'Bug' },
        assignee: { displayName: 'Pedro Costa' },
        created: '2024-06-13T09:15:00Z'
      }
    ];
  }

  private getMockCreatedIssue(projectKey: string, issueData: any) {
    return {
      id: '10999',
      key: `${projectKey}-999`,
      self: `${this.baseURL}/rest/api/3/issue/10999`,
      summary: issueData.fields?.summary || 'Nova Issue',
      status: { name: 'To Do' },
      created: new Date().toISOString()
    };
  }

  private getMockIssueTypes() {
    return [
      {
        id: '1',
        name: 'Story',
        description: 'User story',
        iconUrl: 'https://example.com/story.png'
      },
      {
        id: '2',
        name: 'Task',
        description: 'Task',
        iconUrl: 'https://example.com/task.png'
      },
      {
        id: '3',
        name: 'Bug',
        description: 'Bug',
        iconUrl: 'https://example.com/bug.png'
      },
      {
        id: '4',
        name: 'Epic',
        description: 'Epic',
        iconUrl: 'https://example.com/epic.png'
      }
    ];
  }
}

export const jiraService = new JiraService();

