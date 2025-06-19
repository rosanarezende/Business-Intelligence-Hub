import { ArrowRight, Brain, Github, FileText, Figma, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Brain className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Central de Inteligência</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Agregue informações de múltiplas fontes para gerar documentação técnica 
          de discovery holística e contextualizada
        </p>
        <div className="pt-4">
          <Link to="/discovery/new">
            <Button size="lg" className="text-lg px-8">
              Criar Novo Discovery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Github className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Múltiplos Repositórios</CardTitle>
            <CardDescription>
              Integre código de diferentes repositórios GitHub para análise completa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Frontend (React/Vue/etc)</li>
              <li>• Backend (APIs, serviços)</li>
              <li>• Infraestrutura (Terraform, K8s)</li>
              <li>• Biblioteca de UI compartilhada</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <FileText className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Documentação Estratégica</CardTitle>
            <CardDescription>
              Acesse documentos do Google Workspace para contexto completo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Playbook de engenharia</li>
              <li>• Padrões de nomenclatura</li>
              <li>• Guias de prevenção de incidentes</li>
              <li>• OKRs e métricas</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Figma className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Design e UX</CardTitle>
            <CardDescription>
              Integre designs do Figma para alinhamento visual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Mockups e protótipos</li>
              <li>• Design system</li>
              <li>• Fluxos de usuário</li>
              <li>• Componentes visuais</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Zap className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Geração Automática</CardTitle>
            <CardDescription>
              IA analisa todo o contexto e gera discovery estruturado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Análise holística</li>
              <li>• Quebra em cards acionáveis</li>
              <li>• Consideração de padrões</li>
              <li>• Templates reutilizáveis</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Histórico Centralizado</CardTitle>
            <CardDescription>
              Mantenha todos os discoveries organizados e acessíveis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Busca por equipe/wave</li>
              <li>• Exportação em múltiplos formatos</li>
              <li>• Versionamento de documentos</li>
              <li>• Integração com Jira</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Templates Inteligentes</CardTitle>
            <CardDescription>
              Reutilize padrões e acelere o processo de discovery
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Templates por tipo de projeto</li>
              <li>• Variáveis personalizáveis</li>
              <li>• Padrões da empresa</li>
              <li>• Melhores práticas</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/discovery/new">
            <Button variant="outline" className="w-full h-16 text-left justify-start">
              <Plus className="mr-3 h-5 w-5" />
              <div>
                <div className="font-medium">Novo Discovery</div>
                <div className="text-sm text-muted-foreground">Criar do zero</div>
              </div>
            </Button>
          </Link>
          
          <Link to="/templates">
            <Button variant="outline" className="w-full h-16 text-left justify-start">
              <FileTemplate className="mr-3 h-5 w-5" />
              <div>
                <div className="font-medium">Usar Template</div>
                <div className="text-sm text-muted-foreground">Partir de modelo</div>
              </div>
            </Button>
          </Link>
          
          <Link to="/history">
            <Button variant="outline" className="w-full h-16 text-left justify-start">
              <History className="mr-3 h-5 w-5" />
              <div>
                <div className="font-medium">Ver Histórico</div>
                <div className="text-sm text-muted-foreground">Discoveries anteriores</div>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

