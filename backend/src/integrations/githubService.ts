import axios from 'axios';
import { CodeFile } from '../../../shared/types';

class GitHubService {
  private baseURL = 'https://api.github.com';
  private token: string | undefined;

  constructor() {
    this.token = process.env.GITHUB_TOKEN;
  }

  private getHeaders() {
    return {
      'Authorization': this.token ? `token ${this.token}` : undefined,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Discovery-Platform/1.0'
    };
  }

  async getRepositories(org?: string, search?: string): Promise<any[]> {
    try {
      if (!this.token) {
        console.log('GitHub token não configurado, retornando dados mock');
        return this.getMockRepositories();
      }

      let url = `${this.baseURL}/user/repos`;
      const params: any = {
        sort: 'updated',
        per_page: 50
      };

      if (org) {
        url = `${this.baseURL}/orgs/${org}/repos`;
      }

      if (search) {
        url = `${this.baseURL}/search/repositories`;
        params.q = search;
      }

      const response = await axios.get(url, {
        headers: this.getHeaders(),
        params
      });

      return search ? response.data.items : response.data;
    } catch (error) {
      console.error('Erro ao buscar repositórios:', error);
      return this.getMockRepositories();
    }
  }

  async getRepositoryFiles(owner: string, repo: string, paths: string[] = []): Promise<CodeFile[]> {
    try {
      if (!this.token) {
        console.log('GitHub token não configurado, retornando arquivos mock');
        return this.getMockFiles(repo);
      }

      const files: CodeFile[] = [];

      if (paths.length === 0) {
        // Se não especificou paths, buscar arquivos principais
        paths = ['README.md', 'package.json', 'src/', 'lib/', 'components/'];
      }

      for (const path of paths) {
        try {
          const pathFiles = await this.getFilesFromPath(owner, repo, path);
          files.push(...pathFiles);
        } catch (error) {
          console.error(`Erro ao buscar arquivos do path ${path}:`, error);
        }
      }

      return files;
    } catch (error) {
      console.error('Erro ao buscar arquivos do repositório:', error);
      return this.getMockFiles(repo);
    }
  }

  private async getFilesFromPath(owner: string, repo: string, path: string): Promise<CodeFile[]> {
    const files: CodeFile[] = [];

    try {
      const response = await axios.get(
        `${this.baseURL}/repos/${owner}/${repo}/contents/${path}`,
        { headers: this.getHeaders() }
      );

      const contents = Array.isArray(response.data) ? response.data : [response.data];

      for (const item of contents) {
        if (item.type === 'file' && this.isRelevantFile(item.name)) {
          const fileContent = await this.getFileContent(item.download_url);
          files.push({
            path: item.path,
            content: fileContent,
            language: this.getLanguageFromExtension(item.name),
            size: item.size
          });
        } else if (item.type === 'dir' && files.length < 10) {
          // Recursivamente buscar em diretórios (limitado para evitar muitos arquivos)
          const subFiles = await this.getFilesFromPath(owner, repo, item.path);
          files.push(...subFiles.slice(0, 5)); // Limitar arquivos por diretório
        }
      }
    } catch (error) {
      console.error(`Erro ao buscar conteúdo do path ${path}:`, error);
    }

    return files;
  }

  private async getFileContent(downloadUrl: string): Promise<string> {
    try {
      const response = await axios.get(downloadUrl);
      return response.data;
    } catch (error) {
      console.error('Erro ao baixar conteúdo do arquivo:', error);
      return 'Erro ao carregar conteúdo do arquivo';
    }
  }

  private isRelevantFile(filename: string): boolean {
    const relevantExtensions = [
      '.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go', '.rs',
      '.md', '.json', '.yml', '.yaml', '.xml', '.sql', '.sh'
    ];
    
    const irrelevantFiles = [
      'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
      '.gitignore', '.env', '.env.example'
    ];

    if (irrelevantFiles.includes(filename)) {
      return false;
    }

    return relevantExtensions.some(ext => filename.endsWith(ext));
  }

  private getLanguageFromExtension(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'ts': 'typescript',
      'jsx': 'javascript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'go': 'go',
      'rs': 'rust',
      'md': 'markdown',
      'json': 'json',
      'yml': 'yaml',
      'yaml': 'yaml',
      'xml': 'xml',
      'sql': 'sql',
      'sh': 'bash'
    };

    return languageMap[ext || ''] || 'text';
  }

  private getMockRepositories() {
    return [
      {
        id: 1,
        name: 'frontend-app',
        full_name: 'empresa/frontend-app',
        description: 'Aplicação React principal do produto',
        html_url: 'https://github.com/empresa/frontend-app',
        clone_url: 'https://github.com/empresa/frontend-app.git',
        default_branch: 'main',
        language: 'TypeScript',
        stargazers_count: 45,
        forks_count: 12
      },
      {
        id: 2,
        name: 'backend-api',
        full_name: 'empresa/backend-api',
        description: 'API Node.js com Express e PostgreSQL',
        html_url: 'https://github.com/empresa/backend-api',
        clone_url: 'https://github.com/empresa/backend-api.git',
        default_branch: 'main',
        language: 'JavaScript',
        stargazers_count: 32,
        forks_count: 8
      },
      {
        id: 3,
        name: 'ui-components',
        full_name: 'empresa/ui-components',
        description: 'Biblioteca de componentes React compartilhados',
        html_url: 'https://github.com/empresa/ui-components',
        clone_url: 'https://github.com/empresa/ui-components.git',
        default_branch: 'main',
        language: 'TypeScript',
        stargazers_count: 28,
        forks_count: 15
      }
    ];
  }

  private getMockFiles(repoName: string): CodeFile[] {
    return [
      {
        path: 'src/App.tsx',
        content: `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;`,
        language: 'typescript',
        size: 350
      },
      {
        path: 'package.json',
        content: `{
  "name": "${repoName}",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "typescript": "^5.0.0"
  }
}`,
        language: 'json',
        size: 200
      },
      {
        path: 'README.md',
        content: `# ${repoName}

Este é um projeto exemplo para demonstração da Central de Inteligência.

## Instalação

\`\`\`bash
npm install
npm start
\`\`\`

## Funcionalidades

- Interface moderna com React
- TypeScript para type safety
- Roteamento com React Router`,
        language: 'markdown',
        size: 300
      }
    ];
  }
}

export const githubService = new GitHubService();

