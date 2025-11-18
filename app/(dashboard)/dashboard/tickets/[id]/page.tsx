import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PriorityBadge } from '@/components/priority-badge';
import { StatusBadge } from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

async function getTicket(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/tickets/${id}`, {
    cache: 'no-store',
  });
  
  if (!res.ok) return null;
  return res.json();
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSession();
  if (!user) redirect('/login');

  const { id } = await params;
  const data = await getTicket(id);

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar user={user} />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">Ticket no encontrado</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const { ticket, history } = data;

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Tickets
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Ticket #{ticket.id}</CardTitle>
                  <CardDescription>{ticket.title}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <PriorityBadge priority={ticket.priority} />
                  <StatusBadge status={ticket.status} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Aplicación</h3>
                  <p className="text-sm text-muted-foreground">{ticket.application}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Área</h3>
                  <p className="text-sm text-muted-foreground">{ticket.area}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Creado por</h3>
                  <p className="text-sm text-muted-foreground">{ticket.creator_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Fecha de creación</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(ticket.created_at), "dd 'de' MMMM 'de' yyyy, HH:mm", {
                      locale: es,
                    })}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Nivel de soporte</h3>
                  <Badge variant="outline">Nivel {ticket.support_level}</Badge>
                </div>
                {ticket.closed_at && (
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Cerrado</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(ticket.closed_at), "dd 'de' MMMM 'de' yyyy, HH:mm", {
                        locale: es,
                      })}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Descripción del problema</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {ticket.description}
                </p>
              </div>

              {ticket.ai_analysis && (
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-2">Análisis de IA</h3>
                  <p className="text-sm text-muted-foreground">{ticket.ai_analysis}</p>
                </div>
              )}

              {ticket.resolution && (
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold mb-2">Resolución</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {ticket.resolution}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {history.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Historial</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {history.map((entry: any) => (
                    <div key={entry.id} className="flex gap-3 text-sm">
                      <div className="text-muted-foreground min-w-[140px]">
                        {format(new Date(entry.created_at), 'dd MMM yyyy HH:mm', { locale: es })}
                      </div>
                      <div>
                        <span className="font-medium">{entry.changed_by_name}</span> {entry.action}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
