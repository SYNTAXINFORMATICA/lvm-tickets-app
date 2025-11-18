import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { ReportsDashboard } from '@/components/reports-dashboard';
import { StatsCards } from '@/components/stats-cards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function ReportsPage() {
  const user = await getSession();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Tickets
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Panel de Reportes</CardTitle>
              <CardDescription>
                Estadísticas y análisis de tickets de soporte técnico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StatsCards />
            </CardContent>
          </Card>

          <ReportsDashboard />

          <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Respuestas a Preguntas de Negocio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-background p-4 border">
                <h3 className="font-semibold mb-2 text-primary">
                  1. ¿Cuál es el área con más tickets de soporte creados?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Consulte el gráfico "Tickets por Área" arriba para identificar el área con mayor
                  número de incidencias. El área que aparece en primer lugar es la que tiene más
                  tickets reportados.
                </p>
              </div>
              <div className="rounded-lg bg-background p-4 border">
                <h3 className="font-semibold mb-2 text-primary">
                  2. ¿Cuáles son las apps con más incidencias reportadas?
                </h3>
                <p className="text-sm text-muted-foreground">
                  El gráfico "Tickets por Aplicación" muestra el ranking de aplicaciones. SharePoint
                  Online y Facturador están ordenados por cantidad de incidencias, permitiendo
                  identificar cuál requiere más atención de soporte.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
