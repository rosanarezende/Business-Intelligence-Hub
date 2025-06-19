import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, X, Github, Star, GitFork } from 'lucide-react';

// Mock data para demonstração
const mockRepositories = [
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
    forks_count: 12,
    paths: []
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
    forks_count: 8,
    paths: []
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
    forks_count: 15,
    paths: []
  }
];

export function RepositorySelector({ selected, onChange }) {
  const [search, setSearch] = useState('');
  const [repositories] = useState(mockRepositories);

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(search.toLowerCase()) ||
    repo.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddRepo = (repo) => {
    if (!selected.find(r => r.id === repo.id)) {
      onChange([...selected, { ...repo, paths: [] }]);
    }
  };

  const handleRemoveRepo = (repoId) => {
    onChange(selected.filter(r => r.id !== repoId));
  };

  const handleUpdatePaths = (repoId, paths) => {
    onChange(selected.map(r => 
      r.id === repoId ? { ...r, paths } : r
    ));
  };

  return (
    <div className="space-y-4">
      {/* Repositórios Selecionados */}
      {selected.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Repositórios Selecionados ({selected.length})</h4>
          {selected.map((repo) => (
            <Card key={repo.id} className="border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Github className="h-4 w-4" />
                    <CardTitle className="text-base">{repo.name}</CardTitle>
                    <Badge variant="secondary">{repo.language}</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveRepo(repo.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>{repo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <PathEditor
                  repoName={repo.full_name}
                  paths={repo.paths}
                  onChange={(paths) => handleUpdatePaths(repo.id, paths)}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Buscar Novos Repositórios */}
      <div className="space-y-3">
        <h4 className="font-medium">Adicionar Repositórios</h4>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar repositórios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-3 max-h-60 overflow-y-auto">
          {filteredRepos.map((repo) => {
            const isSelected = selected.find(r => r.id === repo.id);
            return (
              <Card 
                key={repo.id} 
                className={`cursor-pointer transition-colors ${
                  isSelected ? 'bg-muted' : 'hover:bg-muted/50'
                }`}
                onClick={() => !isSelected && handleAddRepo(repo)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Github className="h-4 w-4" />
                        <span className="font-medium">{repo.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {repo.language}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {repo.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="h-3 w-3" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                    </div>
                    {!isSelected && (
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                    {isSelected && (
                      <Badge variant="secondary">Selecionado</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PathEditor({ repoName, paths, onChange }) {
  const [newPath, setNewPath] = useState('');

  const handleAddPath = () => {
    if (newPath.trim() && !paths.includes(newPath.trim())) {
      onChange([...paths, newPath.trim()]);
      setNewPath('');
    }
  };

  const handleRemovePath = (pathToRemove) => {
    onChange(paths.filter(path => path !== pathToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Ex: src/components, docs/, *.md"
          value={newPath}
          onChange={(e) => setNewPath(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddPath()}
          className="text-sm"
        />
        <Button onClick={handleAddPath} size="sm" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {paths.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {paths.map((path, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {path}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => handleRemovePath(path)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
      
      {paths.length === 0 && (
        <p className="text-xs text-muted-foreground">
          Deixe vazio para analisar todo o repositório ou especifique caminhos específicos
        </p>
      )}
    </div>
  );
}

