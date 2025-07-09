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
    <div className="min-h-screen bg-gray-50">
      <Header onLogoClick={() => { setSelectedPatient(null); setIsMessaging(false); }}></Header>

      <div className="flex h-[calc(100vh-90px)]">
        {/* Patient List Sidebar */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="text-sm font-medium text-gray-900">
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
        <div className="flex-1 p-6 overflow-y-auto bg-black/60">
          {selectedPatient ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Patient Header */}
              {!isMessaging ? (<div className="max-w-4xl mx-auto items-center"><PatientDetails patient={selectedPatient} onSendMessage={() => setIsMessaging(true)}></PatientDetails></div>) :
                (
                  <MessageComposer
                    patient={selectedPatient}
                    onSendMessage={handleSendMessage}
                  />
                  )}
              <MessageHistory patientId={selectedPatient.id} />

            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Welcome to MindScape Admin Dashboard</h3>
                <p className="text-white/30">Send compassionate, timely messages to support healing journeys</p>
                {/* Patient Summary Statuses */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex flex-col gap-2 max-w-md mx-auto">
                  <div className="font-semibold text-blue-900">Patient Summary Statuses</div>
                  <div className="text-blue-800 flex justify-between">
                    <span>Need Pre-Session Reminder</span>
                    <span className="font-semibold">{preSessionCount}</span>
                  </div>
                  <div className="text-blue-800 flex justify-between">
                    <span>Awaiting Post-Session Check-in</span>
                    <span className="font-semibold">{postSessionCount}</span>
                  </div>
                  <div className="text-blue-800 flex justify-between">
                    <span>Overdue for Follow-Up</span>
                    <span className="font-semibold">{overdueCount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};