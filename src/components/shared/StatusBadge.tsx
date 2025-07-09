import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export const StatusBadge: React.FC<{ status: Patient['onboardingStatus'] }> = ({ status }) => {
  const config = {
    'pending': {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: AlertCircle,
      label: 'Pending'
    },
    'in-progress': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: Clock,
      label: 'In Progress'
    },
    'completed': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: CheckCircle,
      label: 'Completed'
    },    
    'paused': {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: CheckCircle,
      label: 'Paused'
    }
  };

  const { bg, text, icon: Icon, label } = config[status];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};