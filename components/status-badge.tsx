import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: 'abierto' | 'cerrado';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'cerrado') {
    return (
      <Badge variant="secondary" className="bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Cerrado
      </Badge>
    );
  }

  return (
    <Badge variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
      <Clock className="h-3 w-3 mr-1" />
      Abierto
    </Badge>
  );
}
