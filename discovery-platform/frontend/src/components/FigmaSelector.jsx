import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, X, Figma, ExternalLink } from 'lucide-react';

// Mock data para demonstração
const mockFigmaFiles = [
  {
    key: 'abc123def456',
    name: 'Design System - Componentes Mobile',
    thumbnail_url: 'https://via.placeholder.com/200x150/6366f1/ffffff?text=Design+System',
    last_modified: '2024-06-15T10:30:00Z',
    components: ['Button', 'Input', 'Card', 'Modal'],
    flows: ['Login Flow', 'Onboarding', 'Checkout']
  },
  {
    key: 'def456ghi789',
    name: 'Protótipo - Chat em Tempo Real',
    thumbnail_url: 'https://via.placeholder.com/200x150/10b981/ffffff?text=Chat+Prototype',
    last_modified: '2024-06-14T15:45:00Z',
    components: ['ChatBubble', 'MessageInput', 'UserAvatar'],
    flows: ['Send Message', 'Receive Message', 'File Upload']
  },
  {
    key: 'ghi789jkl012',
    name: 'Wireframes - Dashboard Analytics',
    thumbnail_url: 'https://via.placeholder.com/200x150/f59e0b/ffffff?text=Dashboard',
    last_modified: '2024-06-13T09:20:00Z',
    components: ['Chart', 'KPICard', 'FilterPanel'],
    flows: ['Data Loading', 'Filter Application', 'Export Data']
  }
];

export function FigmaSelector({ selected, onChange }) {
  const [search, setSearch] = useState('');
  const [figmaFiles] = useState(mockFigmaFiles);

  const filteredFiles = figmaFiles.filter(file =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddFile = (file) => {
    if (!selected.find(f => f.key === file.key)) {
      onChange([...selected, file]);
    }
  };

  const handleRemoveFile = (fileKey) => {
    onChange(selected.filter(f => f.key !== fileKey));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {/* Arquivos Selecionados */}
      {selected.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Arquivos Selecionados ({selected.length})</h4>
          {selected.map((file) => (
            <Card key={file.key} className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-3">
                    <img
                      src={file.thumbnail_url}
                      alt={file.name}
                      className="w-16 h-12 object-cover rounded border"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Modificado em {formatDate(file.last_modified)}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {file.components.slice(0, 3).map((component, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {component}
                          </Badge>
                        ))}
                        {file.components.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{file.components.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://figma.com/file/${file.key}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(file.key)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Buscar Novos Arquivos */}
      <div className="space-y-3">
        <h4 className="font-medium">Adicionar Arquivos Figma</h4>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar arquivos do Figma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-3 max-h-60 overflow-y-auto">
          {filteredFiles.map((file) => {
            const isSelected = selected.find(f => f.key === file.key);
            return (
              <Card 
                key={file.key} 
                className={`cursor-pointer transition-colors ${
                  isSelected ? 'bg-muted' : 'hover:bg-muted/50'
                }`}
                onClick={() => !isSelected && handleAddFile(file)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-3">
                      <img
                        src={file.thumbnail_url}
                        alt={file.name}
                        className="w-16 h-12 object-cover rounded border"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{file.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Modificado em {formatDate(file.last_modified)}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {file.components.slice(0, 3).map((component, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {component}
                            </Badge>
                          ))}
                          {file.components.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{file.components.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!isSelected && (
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                      {isSelected && (
                        <Badge variant="secondary">Selecionado</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredFiles.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <Figma className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                {search ? 'Nenhum arquivo encontrado' : 'Conecte-se ao Figma para ver arquivos'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

