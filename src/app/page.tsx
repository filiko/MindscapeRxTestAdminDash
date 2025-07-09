"use client"

import { MessageComposer } from "@/components/dashboard/MessageComposer";
import { MessageHistory } from "@/components/dashboard/MessageHistory";
import { PatientListItem } from "@/components/dashboard/PatientListItem";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Header from "@/components/layout/Header";
import { mockMessageHistory, mockPatients } from "@/lib/data";
import { MessageSquare, User } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [messageHistory, setMessageHistory] = useState<Message[]>(mockMessageHistory);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Header />

      <div className="flex h-[calc(100vh-180px)]">
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
                {filteredPatients.length} Patients
              </div>
            </div>

            {filteredPatients.map((patient) => (
              <PatientListItem
                key={patient.id}
                patient={patient}
                isSelected={selectedPatient?.id === patient.id}
                onClick={() => setSelectedPatient(patient)}
              />
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedPatient ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Patient Header */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E9F9FD] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedPatient.name}</h2>
                    <div className="flex items-center gap-4 mt-1">
                      <StatusBadge status={selectedPatient.onboardingStatus} />
                      <span className="text-sm text-gray-600">
                        Last contact: {selectedPatient.lastContact
                          ? new Date(selectedPatient.lastContact).toLocaleDateString()
                          : 'Never'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Composer */}
              <MessageComposer
                patient={selectedPatient}
                onSendMessage={handleSendMessage}
              />

              {/* Message History */}
              <MessageHistory patientId={selectedPatient.id} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Patient</h3>
                <p className="text-gray-600">Choose a patient from the list to send a message</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

    </div>
  );
};
