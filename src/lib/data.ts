// Mock Data
export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "(555) 123-4567",
    onboardingStatus: "completed",
    joinedDate: "2024-06-15",
    lastContact: "2024-07-08"
  },
  {
    id: "2", 
    name: "Michael Rodriguez",
    email: "m.rodriguez@email.com",
    phone: "(555) 234-5678",
    onboardingStatus: "in-progress",
    joinedDate: "2024-07-01",
    lastContact: "2024-07-05"
  },
  {
    id: "3",
    name: "Emily Watson",
    email: "emily.watson@email.com", 
    phone: "(555) 345-6789",
    onboardingStatus: "pending",
    joinedDate: "2024-07-09"
  },
  {
    id: "4",
    name: "David Thompson",
    email: "david.t@email.com",
    phone: "(555) 456-7890", 
    onboardingStatus: "completed",
    joinedDate: "2024-06-20",
    lastContact: "2024-07-07"
  },
  {
    id: "5",
    name: "Lisa Park",
    email: "lisa.park@email.com",
    phone: "(555) 567-8901",
    onboardingStatus: "in-progress", 
    joinedDate: "2024-06-28",
    lastContact: "2024-07-06"
  }
];

export const messageTemplates: MessageTemplate[] = [
  {
    id: "welcome",
    name: "Welcome & Orientation",
    content: "Welcome to Mindscape Rx! We're honored to support you on your healing journey. Your personalized care team is here to guide you every step of the way. Please let us know if you have any questions about your upcoming session.",
    description: "Initial welcome message for new patients"
  },
  {
    id: "reminder", 
    name: "Session Reminder",
    content: "This is a gentle reminder about your upcoming ketamine therapy session scheduled for tomorrow. Please ensure you're in a comfortable, safe environment and have completed your pre-session preparations. We're here if you need any support.",
    description: "Pre-session reminder and preparation"
  },
  {
    id: "followup",
    name: "Post-Session Check-in", 
    content: "How are you feeling after yesterday's session? Remember that integration is a vital part of your healing process. We encourage you to journal about any insights or experiences. Your care team is available if you'd like to discuss anything.",
    description: "Follow-up after therapy sessions"
  }
];

// Mock message history
export const mockMessageHistory: Message[] = [
  {
    id: "1",
    patientId: "1", 
    content: "Welcome to Mindscape Rx! We're honored to support you on your healing journey...",
    timestamp: "2024-07-08T14:30:00Z",
    template: "welcome"
  },
  {
    id: "2",
    patientId: "2",
    content: "This is a gentle reminder about your upcoming ketamine therapy session...", 
    timestamp: "2024-07-05T09:15:00Z",
    template: "reminder"
  }
];
