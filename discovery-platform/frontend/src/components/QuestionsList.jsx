import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X, HelpCircle } from 'lucide-react';

export function QuestionsList({ questions, onChange }) {
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    if (newQuestion.trim() && !questions.includes(newQuestion.trim())) {
      onChange([...questions, newQuestion.trim()]);
      setNewQuestion('');
    }
  };

  const handleRemoveQuestion = (questionToRemove) => {
    onChange(questions.filter(q => q !== questionToRemove));
  };

  const suggestedQuestions = [
    'Qual a arquitetura atual do sistema?',
    'Existem dependências externas críticas?',
    'Qual o impacto em performance esperado?',
    'Como será feito o rollback em caso de problemas?',
    'Quais métricas devemos monitorar?',
    'Há necessidade de migração de dados?',
    'Qual o plano de testes?',
    'Como será a comunicação com outros times?'
  ];

  return (
    <div className="space-y-4">
      {/* Lista de Questões */}
      {questions.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Questões Adicionadas ({questions.length})</h4>
          <div className="space-y-2">
            {questions.map((question, index) => (
              <Card key={index} className="border-l-4 border-l-orange-500">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      <HelpCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{question}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveQuestion(question)}
                      className="ml-2 flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Adicionar Nova Questão */}
      <div className="space-y-3">
        <h4 className="font-medium">Adicionar Questão</h4>
        <div className="flex space-x-2">
          <Input
            placeholder="Digite uma dúvida específica sobre o projeto..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddQuestion()}
            className="flex-1"
          />
          <Button onClick={handleAddQuestion} disabled={!newQuestion.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Questões Sugeridas */}
      <div className="space-y-3">
        <h4 className="font-medium">Questões Sugeridas</h4>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions
            .filter(q => !questions.includes(q))
            .map((question, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-muted text-xs p-2 h-auto"
                onClick={() => onChange([...questions, question])}
              >
                <Plus className="h-3 w-3 mr-1" />
                {question}
              </Badge>
            ))}
        </div>
        
        {suggestedQuestions.filter(q => !questions.includes(q)).length === 0 && (
          <p className="text-sm text-muted-foreground">
            Todas as questões sugeridas foram adicionadas
          </p>
        )}
      </div>

      {questions.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <HelpCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">
              Adicione questões específicas que precisam ser esclarecidas durante o discovery
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

