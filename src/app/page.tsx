"use client"

import { MessageComposer } from "@/components/dashboard/MessageComposer";
import { MessageHistory } from "@/components/dashboard/MessageHistory";
import { PatientListItem } from "@/components/dashboard/PatientListItem";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Header from "@/components/layout/Header";
import { mockMessageHistory, mockPatients } from "@/lib/data";
import { MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { PatientDetails } from "@/components/dashboard/PatientDetails";

export default function Home() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isMessaging, setIsMessaging] = useState<boolean>(false);
  const [messageHistory, setMessageHistory] = useState<Message[]>(mockMessageHistory);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort patients by status priority: pending -> in-progress -> completed
  const sortedPatients = filteredPatients.sort((a, b) => {
    const statusPriority = { 'pending': 1, 'in-progress': 2, 'completed': 3 };
    return statusPriority[a.onboardingStatus] - statusPriority[b.onboardingStatus];
  });

  // Calculate patient summary statuses from actual data
  const preSessionCount = mockPatients.filter(patient => patient.onboardingStatus === 'pending').length;
  const postSessionCount = mockPatients.filter(patient => patient.onboardingStatus === 'in-progress').length;
  const overdueCount = mockPatients.filter(patient => patient.onboardingStatus === 'completed' && !patient.lastContact).length;

  const handleSendMessage = (content: string, templateId: string | null) => {
    if (!selectedPatient) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      patientId: selectedPatient.id,
      content,
      timestamp: new Date().toISOString(),
      template: templateId
    };

    setMessageHistory(prev => [...prev, newMessage]);

    alert('Message sent successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onLogoClick={() => { setSelectedPatient(null); setIsMessaging(false); }}></Header>

      <div className="flex h-[calc(100vh-90px)]">
        {/* Patient List Sidebar */}
        <div className="w-96 bg-white border-r border-slate-300 flex flex-col shadow-xl">
          <div className="p-6 border-b border-slate-200">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 bg-white text-slate-700 placeholder-slate-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <div className="text-sm font-semibold text-slate-700">
                {sortedPatients.length} Patients
              </div>
            </div>

            {sortedPatients.map((patient) => (
              <PatientListItem
                key={patient.id}
                patient={patient}
                isSelected={selectedPatient?.id === patient.id}
                onClick={() => { setSelectedPatient(patient); setIsMessaging(false); }}
                onClickMessage={(e: any) => { e.stopPropagation(); setSelectedPatient(patient); setIsMessaging(true); }}
              />
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50">
          {selectedPatient ? (
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Patient Header */}
              {!isMessaging ? (
                <div className="max-w-5xl mx-auto">
                  <PatientDetails patient={selectedPatient} onSendMessage={() => setIsMessaging(true)} />
                </div>
              ) : (
                <MessageComposer
                  patient={selectedPatient}
                  onSendMessage={handleSendMessage}
                />
              )}
              <MessageHistory patientId={selectedPatient.id} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-2xl">
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Welcome!</h3>
                {/* Patient Summary Statuses */}
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-8 shadow-lg max-w-lg mx-auto">
                  <div className="font-bold text-slate-800 text-lg mb-6">Patient Summary Statuses</div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/60">
                      <span className="text-slate-700 font-medium">Need Pre-Session Reminder</span>
                      <span className="font-bold text-amber-600 text-lg">{preSessionCount}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/60">
                      <span className="text-slate-700 font-medium">Awaiting Post-Session Check-in</span>
                      <span className="font-bold text-blue-600 text-lg">{postSessionCount}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200/60">
                      <span className="text-slate-700 font-medium">Overdue for Follow-Up</span>
                      <span className="font-bold text-red-600 text-lg">{overdueCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
