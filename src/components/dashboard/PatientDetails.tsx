import { User, MessageSquare } from "lucide-react";
import { StatusBadge } from "../shared/StatusBadge";

export const PatientDetails: React.FC<{ 
    patient: Patient; 
    onSendMessage?: () => void;
}> = ({ patient, onSendMessage }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {/* Left Column - Profile Picture */}
                <div className="flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-[#E9E9FD] rounded-full flex items-center justify-center mb-4">
                        <User className="w-16 h-16 text-blue-600" />
                    </div>
                    <StatusBadge status={patient.onboardingStatus} />
                </div>

                {/* Middle Column - Patient Info */}
                <div className="flex flex-col justify-center space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-900">{patient.name}</h2>
                    <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">Email:</span> {patient.email ? patient.email : '--'}
                        </div>
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">Phone:</span> {patient.phone ? patient.phone : '--'}
                        </div>
                    </div>
                </div>

                {/* Right Column - Dates and Action */}
                <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">Joined:</span> {patient.joinedDate ? new Date(patient.joinedDate).toDateString() : '--'}
                        </div>
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">Last Contact:</span> {patient.lastContact ? new Date(patient.lastContact).toDateString() : 'Never'}
                        </div>
                    </div>
                    
                    {onSendMessage && (
                        <button
                            onClick={onSendMessage}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Send Message
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}