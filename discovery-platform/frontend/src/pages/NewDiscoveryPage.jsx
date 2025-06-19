import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { RepositorySelector } from '@/components/RepositorySelector';
import { DocumentSelector } from '@/components/DocumentSelector';
import { FigmaSelector } from '@/components/FigmaSelector';
import { QuestionsList } from '@/components/QuestionsList';
import { DiscoveryResult } from '@/components/DiscoveryResult';
import { useDiscovery } from '@/hooks/useDiscovery';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function NewDiscoveryPage() {
  const [config, setConfig] = useState({
    experimentName: '',
    responsible: '',
    wave: '',
    prototypeUrl: '',
    repositories: [],
    googleDocs: [],
    figmaFiles: [],
    questions: [],
    aiModel: 'gpt-4'
  });

  const [result, setResult] = useState(null);
  const { loading, error, generateDiscovery } = useDiscovery();

  const handleGenerate = async () => {
    try {
      const discoveryResult = await generateDiscovery(config);
      setResult(discoveryResult.data);
    } catch (error) {
      console.error('Erro ao gerar discovery:', error);
    }
  };

  const isFormValid = config.experimentName && config.responsible && config.wave;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Novo Discovery Técnico</h1>
        <p className="text-muted-foreground">
          Configure as fontes de informação e gere automaticamente um discovery completo
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>
            Dados fundamentais sobre o experimento ou projeto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experimentName">Nome do Experimento *</Label>
              <Input
                id="experimentName"
                placeholder="Ex: Implementação de Chat em Tempo Real"
                value={config.experimentName}
                onChange={(e) => setConfig({...config, experimentName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="responsible">Responsável Técnico *</Label>
              <Input
                id="responsible"
                placeholder="Ex: João Silva"
                value={config.responsible}
                onChange={(e) => setConfig({...config, responsible: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wave">Wave *</Label>
              <Input
                id="wave"
                placeholder="Ex: Q1 2024"
                value={config.wave}
                onChange={(e) => setConfig({...config, wave: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="prototypeUrl">Link do Protótipo</Label>
              <Input
                id="prototypeUrl"
                type="url"
                placeholder="https://figma.com/proto/..."
                value={config.prototypeUrl}
                onChange={(e) => setConfig({...config, prototypeUrl: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seleção de Repositórios */}
      <Card>
        <CardHeader>
          <CardTitle>Repositórios GitHub</CardTitle>
          <CardDescription>
            Selecione os repositórios relevantes para análise do código
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RepositorySelector
            selected={config.repositories}
            onChange={(repos) => setConfig({...config, repositories: repos})}
          />
        </CardContent>
      </Card>

      {/* Seleção de Documentos */}
      <Card>
        <CardHeader>
          <CardTitle>Documentação Google Workspace</CardTitle>
          <CardDescription>
            Inclua documentos estratégicos e de contexto da empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentSelector
            selected={config.googleDocs}
            onChange={(docs) => setConfig({...config, googleDocs: docs})}
          />
        </CardContent>
      </Card>

      {/* Seleção de Designs */}
      <Card>
        <CardHeader>
          <CardTitle>Designs Figma</CardTitle>
          <CardDescription>
            Referencie mockups, protótipos e componentes visuais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FigmaSelector
            selected={config.figmaFiles}
            onChange={(files) => setConfig({...config, figmaFiles: files})}
          />
        </CardContent>
      </Card>

      {/* Dúvidas para Esclarecer */}
      <Card>
        <CardHeader>
          <CardTitle>Dúvidas a Esclarecer</CardTitle>
          <CardDescription>
            Liste questões específicas que precisam ser respondidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuestionsList
            questions={config.questions}
            onChange={(questions) => setConfig({...config, questions})}
          />
        </CardContent>
      </Card>

      {/* Botão de Gerar */}
      <div className="flex justify-center">
        <Button
          onClick={handleGenerate}
          disabled={loading || !isFormValid}
          size="lg"
          className="px-8"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Gerando Discovery...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Gerar Discovery
            </>
          )}
        </Button>
      </div>

      {/* Resultado */}
      {result && (
        <>
          <Separator className="my-8" />
          <DiscoveryResult result={result} />
        </>
      )}
    </div>
  );
}

