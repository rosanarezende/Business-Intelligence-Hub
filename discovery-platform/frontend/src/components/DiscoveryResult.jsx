import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Download, ExternalLink, Edit, Share } from 'lucide-react';

export function DiscoveryResult({ result }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `discovery-${result.config.experimentName.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCreateJira = () => {
    // Simular integração com Jira
    alert('Funcionalidade de integração com Jira será implementada nas próximas fases');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header do Resultado */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Discovery Gerado</CardTitle>
              <CardDescription>
                Criado em {formatDate(result.createdAt)} • ID: {result.id}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              {result.status === 'completed' ? 'Concluído' : 'Rascunho'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm">
              <Copy className="mr-2 h-4 w-4" />
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Baixar .md
            </Button>
            <Button onClick={handleCreateJira} variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Criar no Jira
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resumo da Configuração */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Configuração Utilizada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Experimento</h4>
              <p>{result.config.experimentName}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Responsável</h4>
              <p>{result.config.responsible}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Wave</h4>
              <p>{result.config.wave}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Protótipo</h4>
              {result.config.prototypeUrl ? (
                <a 
                  href={result.config.prototypeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ver protótipo
                </a>
              ) : (
                <span className="text-muted-foreground">Não informado</span>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">
                Repositórios ({result.config.repositories.length})
              </h4>
              <div className="space-y-1">
                {result.config.repositories.map((repo, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {repo.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">
                Documentos ({result.config.googleDocs.length})
              </h4>
              <div className="space-y-1">
                {result.config.googleDocs.map((doc, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {doc.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">
                Designs ({result.config.figmaFiles.length})
              </h4>
              <div className="space-y-1">
                {result.config.figmaFiles.map((file, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {file.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo do Discovery */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conteúdo do Discovery</CardTitle>
          <CardDescription>
            Documentação técnica gerada automaticamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{result.content}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

