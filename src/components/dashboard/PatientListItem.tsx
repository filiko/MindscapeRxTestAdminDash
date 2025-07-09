import { Calendar, ChevronRight, Mail, Phone, User } from "lucide-react";
import { StatusBadge } from '@/components/shared/StatusBadge'

export const PatientListItem: React.FC<{
  patient: Patient;
  isSelected: boolean;
  onClick: () => void;
}> = ({ patient, isSelected, onClick }) => {
  return (
    <div
      className={`p-4 rounded-lg gap-4 border-b border-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${isSelected ? 'bg-blue-50 border-blue-200' : ''
        }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 justify-between">
            <div className="flex">
              <div className="w-8 h-8 bg-[#E9F9FD] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />

              </div>
              <div className="flex items-center ">
                <h3 className="font-medium text-gray-900 truncate">{patient.name}</h3>
              </div>
            </div>
            <StatusBadge status={patient.onboardingStatus} />
          </div>

          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              <span className="truncate">{patient.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>Joined {new Date(patient.joinedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
      </div>
    </div>
  );
};
