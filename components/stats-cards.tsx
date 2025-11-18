'use client';

import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function StatsCards() {
  const { data, isLoading } = useSWR('/api/tickets', fetcher);

  const tickets = data?.tickets || [];
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t: any) => t.status === 'abierto').length;
  const closedTickets = tickets.filter((t: any) => t.status === 'cerrado').length;
  const urgentTickets = tickets.filter((t: any) => t.priority === 'Urgente').length;

  const stats = [
    {
      title: 'Total de Tickets',
      value: totalTickets,
      icon: Ticket,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: 'Tickets Abiertos',
      value: openTickets,
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950',
    },
    {
      title: 'Tickets Cerrados',
      value: closedTickets,
      icon: CheckCircle2,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: 'Prioridad Urgente',
      value: urgentTickets,
      icon: TrendingUp,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cargando...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalTickets > 0
                  ? `${Math.round((stat.value / totalTickets) * 100)}% del total`
                  : 'Sin datos'}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
