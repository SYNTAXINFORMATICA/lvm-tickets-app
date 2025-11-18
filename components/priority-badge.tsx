import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface PriorityBadgeProps {
  priority: 'Urgente' | 'Media' | 'Normal';
  showIcon?: boolean;
}

export function PriorityBadge({ priority, showIcon = true }: PriorityBadgeProps) {
  const config = {
    Urgente: {
      color: 'bg-red-500 hover:bg-red-600 text-white',
      icon: AlertTriangle,
      label: 'Urgente',
    },
    Media: {
      color: 'bg-amber-500 hover:bg-amber-600 text-white',
      icon: AlertCircle,
      label: 'Media',
    },
    Normal: {
      color: 'bg-green-500 hover:bg-green-600 text-white',
      icon: Info,
      label: 'Normal',
    },
  };

  const { color, icon: Icon, label } = config[priority];

  return (
    <Badge className={color}>
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {label}
    </Badge>
  );
}
