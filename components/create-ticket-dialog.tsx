'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mutate } from 'swr';

export function CreateTicketDialog() {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    application: '',
    area: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Error',
          description: data.error || 'No se pudo crear el ticket.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      toast({
        title: 'Ticket creado',
        description: `El ticket #${data.ticket.id} ha sido analizado por el agente de IA.`,
      });

      // Show AI analysis result
      if (data.aiAnalysis.can_resolve) {
        toast({
          title: 'Ticket resuelto automáticamente',
          description: 'El agente de IA ha resuelto este ticket en nivel 1.',
        });
      } else {
        toast({
          title: 'Ticket escalado',
          description: 'El ticket ha sido escalado a soporte nivel 2.',
        });
      }

      setFormData({ title: '', description: '', application: '', area: '' });
      setOpen(false);
      mutate('/api/tickets');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error de conexión al crear el ticket.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Crear Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Ticket</DialogTitle>
          <DialogDescription>
            Complete los detalles del problema técnico. El agente de IA analizará y determinará la
            prioridad automáticamente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título del problema</Label>
            <Input
              id="title"
              placeholder="Ej: No puedo acceder a la biblioteca de documentos"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción detallada</Label>
            <Textarea
              id="description"
              placeholder="Describa el problema con el mayor detalle posible..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              disabled={loading}
              rows={5}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="application">Aplicación</Label>
              <Select
                value={formData.application}
                onValueChange={(value) => setFormData({ ...formData, application: value })}
                disabled={loading}
              >
                <SelectTrigger id="application">
                  <SelectValue placeholder="Seleccione una aplicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SharePoint Online">SharePoint Online</SelectItem>
                  <SelectItem value="Facturador">Facturador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Área</Label>
              <Input
                id="area"
                placeholder="Ej: Ventas, Contabilidad, IT"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {loading ? 'Creando...' : 'Crear Ticket'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
