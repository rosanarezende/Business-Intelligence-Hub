import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, History, FileTemplate, Github, FileText, Figma, Jira } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Início', href: '/', icon: Home },
  { name: 'Novo Discovery', href: '/discovery/new', icon: Plus },
  { name: 'Histórico', href: '/history', icon: History },
  { name: 'Templates', href: '/templates', icon: FileTemplate },
];

const integrations = [
  { name: 'GitHub', icon: Github, status: 'connected' },
  { name: 'Google Docs', icon: FileText, status: 'disconnected' },
  { name: 'Figma', icon: Figma, status: 'connected' },
  { name: 'Jira', icon: Jira, status: 'disconnected' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r bg-card">
      <nav className="p-4 space-y-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive && 'bg-secondary'
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
        
        <div className="pt-6">
          <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
            Integrações
          </h3>
          <div className="space-y-1">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-between px-2 py-1.5 text-sm"
              >
                <div className="flex items-center">
                  <integration.icon className="mr-2 h-4 w-4" />
                  {integration.name}
                </div>
                <div
                  className={cn(
                    'h-2 w-2 rounded-full',
                    integration.status === 'connected'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

