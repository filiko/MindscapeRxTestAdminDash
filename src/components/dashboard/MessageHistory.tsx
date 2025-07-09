import { messageTemplates, mockMessageHistory } from "@/lib/data";
import { Clock, MessageSquare } from "lucide-react";

export const MessageHistory: React.FC<{ patientId: string }> = ({ patientId }) => {
  const patientMessages = mockMessageHistory.filter(msg => msg.patientId === patientId);

  if (patientMessages.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">No previous messages</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Message History</h3>
      <div className="space-y-4">
        {patientMessages.map((message) => (
          <div key={message.id} className="border-l-4 border-blue-200 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {new Date(message.timestamp).toLocaleString()}
              </span>
              {message.template && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {messageTemplates.find(t => t.id === message.template)?.name}
                </span>
              )}
            </div>
            <p className="text-gray-900 text-sm leading-relaxed">
              {message.content.substring(0, 150)}
              {message.content.length > 150 && '...'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};