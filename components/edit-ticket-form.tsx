'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  resolution: string | null;
}

export function EditTicketForm({ ticket }: { ticket: Ticket }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: ticket.title,
    description: ticket.description,
    priority: ticket.priority,
    status: ticket.status,
    resolution: ticket.resolution || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Error',
          description: data.error || 'No se pudo actualizar el ticket.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      toast({
        title: 'Ticket actualizado',
        description: 'Los cambios han sido guardados exitosamente.',
      });

      router.push(`/dashboard/tickets/${ticket.id}`);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error de conexión al actualizar el ticket.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          disabled={loading}
          rows={5}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridad</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => setFormData({ ...formData, priority: value })}
            disabled={loading}
          >
            <SelectTrigger id="priority">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Media">Media</SelectItem>
              <SelectItem value="Urgente">Urgente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
            disabled={loading}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="abierto">Abierto</SelectItem>
              <SelectItem value="cerrado">Cerrado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="resolution">Resolución</Label>
        <Textarea
          id="resolution"
          value={formData.resolution}
          onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
          disabled={loading}
          rows={4}
          placeholder="Agregue la resolución del ticket (opcional)"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </form>
  );
}
