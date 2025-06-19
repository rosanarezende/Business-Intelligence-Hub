import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Histórico de Discoveries</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie todos os discoveries criados
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
            Aqui você poderá visualizar, buscar e gerenciar todos os discoveries 
            criados pela sua equipe, com filtros por wave, responsável e status.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

