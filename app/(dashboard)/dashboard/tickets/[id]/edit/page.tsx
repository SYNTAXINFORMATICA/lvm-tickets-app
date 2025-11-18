import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { EditTicketForm } from '@/components/edit-ticket-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

async function getTicket(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/tickets/${id}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function EditTicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSession();

  if (!user) {
    redirect('/login');
  }

  if (user.role !== 'administrador' && user.role !== 'ingeniero') {
    redirect('/dashboard');
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href={`/dashboard/tickets/${id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Ticket
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Editar Ticket #{id}</CardTitle>
            <CardDescription>Actualice la información del ticket</CardDescription>
          </CardHeader>
          <CardContent>
            <EditTicketForm ticket={data.ticket} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
