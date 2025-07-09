import { User, MessageSquare } from "lucide-react";
import { StatusBadge } from "../shared/StatusBadge";

export const PatientDetails: React.FC<{ 
    patient: Patient; 
    onSendMessage?: () => void;
}> = ({ patient, onSendMessage }) => {
    return (
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-8 h-full shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                {/* Left Column - Profile Picture */}
                <div className="flex flex-col items-center justify-center">
                    <div className="w-36 h-36 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-lg border border-indigo-200/60">
                        <User className="w-20 h-20 text-indigo-600" />
                    </div>
                    <StatusBadge status={patient.onboardingStatus} />
                </div>

                {/* Middle Column - Patient Info */}
                <div className="flex flex-col justify-center space-y-4">
                    <h2 className="text-3xl font-bold text-slate-800">{patient.name}</h2>
                    <div className="space-y-3">
                        <div className="text-slate-600">
                            <span className="font-semibold text-slate-700">Email:</span> {patient.email ? patient.email : '--'}
                        </div>
                        <div className="text-slate-600">
                            <span className="font-semibold text-slate-700">Phone:</span> {patient.phone ? patient.phone : '--'}
                        </div>
                    </div>
                </div>

                {/* Right Column - Dates and Action */}
                <div className="flex flex-col justify-between">
                    <div className="space-y-3">
                        <div className="text-slate-600">
                            <span className="font-semibold text-slate-700">Joined:</span> {patient.joinedDate ? new Date(patient.joinedDate).toDateString() : '--'}
                        </div>
                        <div className="text-slate-600">
                            <span className="font-semibold text-slate-700">Last Contact:</span> {patient.lastContact ? new Date(patient.lastContact).toDateString() : 'Never'}
                        </div>
                    </div>
                    
                    {onSendMessage && (
                        <button
                            onClick={onSendMessage}
                            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-3 justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Send Message
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}