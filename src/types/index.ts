// Types
interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  onboardingStatus: 'pending' | 'in-progress' | 'completed';
  joinedDate: string;
  lastContact?: string;
}

interface Message {
  id: string;
  patientId: string;
  content: string;
  timestamp: string;
  template: string | null;
}

interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  description: string;
}
