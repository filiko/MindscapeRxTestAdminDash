import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export const StatusBadge: React.FC<{ status: Patient['onboardingStatus'] }> = ({ status }) => {
  const config = {
    'pending': {
      bg: 'bg-gradient-to-r from-amber-100 to-orange-100',
      text: 'text-amber-800',
      border: 'border-amber-200',
      icon: AlertCircle,
      label: 'Pending'
    },
    'in-progress': {
      bg: 'bg-gradient-to-r from-blue-100 to-indigo-100',
      text: 'text-blue-800',
      border: 'border-blue-200',
      icon: Clock,
      label: 'In Progress'
    },
    'completed': {
      bg: 'bg-gradient-to-r from-emerald-100 to-green-100',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      icon: CheckCircle,
      label: 'Completed'
    },    
    'paused': {
      bg: 'bg-gradient-to-r from-red-100 to-pink-100',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: CheckCircle,
      label: 'Paused'
    }
  };

  const { bg, text, border, icon: Icon, label } = config[status];

  return (
    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm font-semibold ${bg} ${text} ${border} border shadow-sm whitespace-nowrap flex-shrink-0`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{label}</span>
    </span>
  );
};