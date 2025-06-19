import { Brain, Menu, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4">
          <Brain className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold">Central de Inteligência</h1>
            <p className="text-sm text-muted-foreground">Discovery Platform</p>
          </div>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

