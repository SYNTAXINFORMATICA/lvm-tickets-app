import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { TicketTable } from '@/components/ticket-table';
import { CreateTicketDialog } from '@/components/create-ticket-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DashboardPage() {
  const user = await getSession();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Bandeja de Tickets</CardTitle>
                <CardDescription>
                  Gestión de incidencias técnicas con resolución automática mediante IA
                </CardDescription>
              </div>
              <CreateTicketDialog />
            </div>
          </CardHeader>
          <CardContent>
            <TicketTable userRole={user.role} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
