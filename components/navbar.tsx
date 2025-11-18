'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NavbarProps {
  user: {
    name: string;
    role: string;
  };
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast({
        title: 'Sesión cerrada',
        description: 'Ha cerrado sesión exitosamente.',
      });
      router.push('/login');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al cerrar sesión.',
        variant: 'destructive',
      });
    }
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">DoctuxDB Support</h1>
          <div className="hidden md:flex gap-4">
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>
              Tickets
            </Button>
            <Button variant="ghost" onClick={() => router.push('/dashboard/reports')}>
              Reportes
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            <div className="hidden sm:block">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
      </div>
    </nav>
  );
}
