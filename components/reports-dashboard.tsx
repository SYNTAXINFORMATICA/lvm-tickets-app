'use client';

import useSWR from 'swr';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ReportsDashboard() {
  const { data: areaData, isLoading: areaLoading } = useSWR(
    '/api/reports/tickets-by-area',
    fetcher
  );
  const { data: appData, isLoading: appLoading } = useSWR('/api/reports/tickets-by-app', fetcher);

  const ticketsByArea = areaData?.data || [];
  const ticketsByApp = appData?.data || [];

  const maxAreaCount = Math.max(...ticketsByArea.map((item: any) => Number(item.ticket_count)), 1);
  const maxAppCount = Math.max(...ticketsByApp.map((item: any) => Number(item.ticket_count)), 1);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>Tickets por Área</CardTitle>
          </div>
          <CardDescription>Áreas con más incidencias reportadas</CardDescription>
        </CardHeader>
        <CardContent>
          {areaLoading ? (
            <div className="text-center py-8 text-muted-foreground">Cargando datos...</div>
          ) : ticketsByArea.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No hay datos disponibles</div>
          ) : (
            <div className="space-y-4">
              {ticketsByArea.map((item: any, index: number) => (
                <div key={item.area} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          index === 0
                            ? 'bg-amber-500 text-white'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="font-medium">{item.area}</span>
                    </div>
                    <span className="font-bold">{item.ticket_count} tickets</span>
                  </div>
                  <div className="relative h-8 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full transition-all duration-500 ${
                        index === 0
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}
                      style={{
                        width: `${(Number(item.ticket_count) / maxAreaCount) * 100}%`,
                      }}
                    >
                      <div className="flex h-full items-center justify-end pr-2">
                        <span className="text-xs font-semibold text-white">
                          {Math.round((Number(item.ticket_count) / maxAreaCount) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {ticketsByArea.length > 0 && (
                <div className="mt-6 flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-950 p-4">
                  <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <div>
                    <p className="text-sm font-semibold">Área con más tickets</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-bold text-foreground">{ticketsByArea[0].area}</span> con{' '}
                      {ticketsByArea[0].ticket_count} incidencias
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>Tickets por Aplicación</CardTitle>
          </div>
          <CardDescription>Aplicaciones con más incidencias reportadas</CardDescription>
        </CardHeader>
        <CardContent>
          {appLoading ? (
            <div className="text-center py-8 text-muted-foreground">Cargando datos...</div>
          ) : ticketsByApp.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No hay datos disponibles</div>
          ) : (
            <div className="space-y-4">
              {ticketsByApp.map((item: any, index: number) => (
                <div key={item.application} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          index === 0
                            ? 'bg-red-500 text-white'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="font-medium">{item.application}</span>
                    </div>
                    <span className="font-bold">{item.ticket_count} tickets</span>
                  </div>
                  <div className="relative h-8 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full transition-all duration-500 ${
                        index === 0
                          ? 'bg-gradient-to-r from-red-500 to-red-600'
                          : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                      }`}
                      style={{
                        width: `${(Number(item.ticket_count) / maxAppCount) * 100}%`,
                      }}
                    >
                      <div className="flex h-full items-center justify-end pr-2">
                        <span className="text-xs font-semibold text-white">
                          {Math.round((Number(item.ticket_count) / maxAppCount) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {ticketsByApp.length > 0 && (
                <div className="mt-6 flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-950 p-4">
                  <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="text-sm font-semibold">App con más incidencias</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-bold text-foreground">{ticketsByApp[0].application}</span>{' '}
                      con {ticketsByApp[0].ticket_count} tickets
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
