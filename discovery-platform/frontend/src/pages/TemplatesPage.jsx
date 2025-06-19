import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="text-muted-foreground">
          Gerencie templates reutilizáveis para acelerar o processo de discovery
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Em Desenvolvimento</CardTitle>
          <CardDescription>
            Esta funcionalidade será implementada nas próximas fases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aqui você poderá criar, editar e usar templates personalizados 
            para diferentes tipos de projetos e experimentos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

