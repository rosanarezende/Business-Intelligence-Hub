import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, X, FileText, ExternalLink } from 'lucide-react';

// Mock data para demonstração
const mockDocuments = [
  {
    id: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    name: 'Playbook de Engenharia - Tribo Mobile',
    mimeType: 'application/vnd.google-apps.document',
    webViewLink: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
    content: ''
  },
  {
    id: '1mGVIs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    name: 'Padrões de Nomenclatura - Analytics',
    mimeType: 'application/vnd.google-apps.document',
    webViewLink: 'https://docs.google.com/document/d/1mGVIs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
    content: ''
  },
  {
    id: '1nHWJs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    name: 'Guia de Prevenção de Incidentes',
    mimeType: 'application/vnd.google-apps.document',
    webViewLink: 'https://docs.google.com/document/d/1nHWJs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
    content: ''
  },
  {
    id: '1oIXKs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    name: 'OKRs Q1 2024 - Produto',
    mimeType: 'application/vnd.google-apps.spreadsheet',
    webViewLink: 'https://docs.google.com/spreadsheets/d/1oIXKs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
    content: ''
  }
];

export function DocumentSelector({ selected, onChange }) {
  const [search, setSearch] = useState('');
  const [documents] = useState(mockDocuments);

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddDoc = (doc) => {
    if (!selected.find(d => d.id === doc.id)) {
      onChange([...selected, doc]);
    }
  };

  const handleRemoveDoc = (docId) => {
    onChange(selected.filter(d => d.id !== docId));
  };

  const getDocIcon = (mimeType) => {
    if (mimeType.includes('spreadsheet')) {
      return '📊';
    } else if (mimeType.includes('presentation')) {
      return '📽️';
    } else {
      return '📄';
    }
  };

  const getDocType = (mimeType) => {
    if (mimeType.includes('spreadsheet')) {
      return 'Planilha';
    } else if (mimeType.includes('presentation')) {
      return 'Apresentação';
    } else {
      return 'Documento';
    }
  };

  return (
    <div className="space-y-4">
      {/* Documentos Selecionados */}
      {selected.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Documentos Selecionados ({selected.length})</h4>
          {selected.map((doc) => (
            <Card key={doc.id} className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getDocIcon(doc.mimeType)}</span>
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {getDocType(doc.mimeType)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(doc.webViewLink, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDoc(doc.id)}
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

      {/* Buscar Novos Documentos */}
      <div className="space-y-3">
        <h4 className="font-medium">Adicionar Documentos</h4>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos do Google Workspace..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-3 max-h-60 overflow-y-auto">
          {filteredDocs.map((doc) => {
            const isSelected = selected.find(d => d.id === doc.id);
            return (
              <Card 
                key={doc.id} 
                className={`cursor-pointer transition-colors ${
                  isSelected ? 'bg-muted' : 'hover:bg-muted/50'
                }`}
                onClick={() => !isSelected && handleAddDoc(doc)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getDocIcon(doc.mimeType)}</span>
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {getDocType(doc.mimeType)}
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

        {filteredDocs.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                {search ? 'Nenhum documento encontrado' : 'Conecte-se ao Google Workspace para ver documentos'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

