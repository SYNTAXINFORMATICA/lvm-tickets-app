'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PriorityBadge } from '@/components/priority-badge';
import { StatusBadge } from '@/components/status-badge';
import { Eye, Pencil, Trash2, ArrowUpDown, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: number;
  title: string;
  description: string;
  application: string;
  area: string;
  priority: 'Urgente' | 'Media' | 'Normal';
  status: 'abierto' | 'cerrado';
  support_level: number;
  created_at: string;
  creator_name: string;
}

interface TicketTableProps {
  userRole: 'administrador' | 'analista' | 'ingeniero';
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TicketTable({ userRole }: TicketTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [appFilter, setAppFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Ticket>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const { data, error, isLoading } = useSWR('/api/tickets', fetcher, {
    refreshInterval: 5000,
  });

  const tickets: Ticket[] = data?.tickets || [];

  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.area.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
      const matchesApp = appFilter === 'all' || ticket.application === appFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesApp;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [tickets, searchTerm, statusFilter, priorityFilter, appFilter, sortField, sortDirection]);

  const handleSort = (field: keyof Ticket) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este ticket?')) return;

    try {
      const response = await fetch(`/api/tickets/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Ticket eliminado',
          description: 'El ticket ha sido eliminado exitosamente.',
        });
        mutate('/api/tickets');
      } else {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.error || 'No se pudo eliminar el ticket.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error de conexión al eliminar el ticket.',
        variant: 'destructive',
      });
    }
  };

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        Error al cargar los tickets. Por favor, recargue la página.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="abierto">Abierto</SelectItem>
              <SelectItem value="cerrado">Cerrado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Urgente">Urgente</SelectItem>
              <SelectItem value="Media">Media</SelectItem>
              <SelectItem value="Normal">Normal</SelectItem>
            </SelectContent>
          </Select>

          <Select value={appFilter} onValueChange={setAppFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Aplicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="SharePoint Online">SharePoint Online</SelectItem>
              <SelectItem value="Facturador">Facturador</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('id')}
                  className="h-8 px-2"
                >
                  ID
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('title')}
                  className="h-8 px-2"
                >
                  Título
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Aplicación</TableHead>
              <TableHead>Área</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('priority')}
                  className="h-8 px-2"
                >
                  Prioridad
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('status')}
                  className="h-8 px-2"
                >
                  Estado
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Creado por</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('created_at')}
                  className="h-8 px-2"
                >
                  Fecha
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  Cargando tickets...
                </TableCell>
              </TableRow>
            ) : filteredAndSortedTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  No se encontraron tickets.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">#{ticket.id}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{ticket.title}</TableCell>
                  <TableCell>{ticket.application}</TableCell>
                  <TableCell>{ticket.area}</TableCell>
                  <TableCell>
                    <PriorityBadge priority={ticket.priority} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={ticket.status} />
                  </TableCell>
                  <TableCell>{ticket.creator_name}</TableCell>
                  <TableCell>
                    {format(new Date(ticket.created_at), 'dd MMM yyyy', { locale: es })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/dashboard/tickets/${ticket.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {(userRole === 'administrador' || userRole === 'ingeniero') && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/dashboard/tickets/${ticket.id}/edit`)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {userRole === 'administrador' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(ticket.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Mostrando {filteredAndSortedTickets.length} de {tickets.length} tickets
      </div>
    </div>
  );
}
