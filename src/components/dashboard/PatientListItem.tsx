import { Calendar, MessageCircle, Mail, Phone, User } from "lucide-react";
import { StatusBadge } from '@/components/shared/StatusBadge'

export const PatientListItem: React.FC<{
  patient: Patient;
  isSelected: boolean;
  onClick: () => void;
  onClickMessage: (e: any) => void;
}> = ({ patient, isSelected, onClick, onClickMessage }) => {
  return (
    <div
      className={`p-2 gap-4 border-b border-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${isSelected ? 'bg-blue-200' : ''
        }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex min-w-0">
          <div className="flex items-center gap-3 justify-between pr-2">
            <div className="flex">
              <div className="w-12 h-12 bg-[#E9F9FD] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 truncate">{patient.name}</h3>
                <StatusBadge status={patient.onboardingStatus} />
            </div>
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

        <MessageCircle className={`w-8 h-8 text-blue-400 m-4 z-[50]`} onClick={onClickMessage}/>
      </div>
    </div>
  );
};
