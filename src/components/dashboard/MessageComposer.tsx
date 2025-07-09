import { messageTemplates } from "@/lib/data";
import { Send } from "lucide-react";
import { useState } from "react";

export const MessageComposer: React.FC<{
  patient: Patient;
  onSendMessage: (content: string, templateId: string | null) => void;
}> = ({ patient, onSendMessage }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [isSending, setIsSending] = useState(false);

  const currentContent = selectedTemplate
    ? messageTemplates.find(t => t.id === selectedTemplate)?.content || ''
    : customMessage;

  const handleSend = async () => {
    if (!currentContent.trim()) return;

    setIsSending(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    onSendMessage(currentContent, selectedTemplate || null);
    setSelectedTemplate('');
    setCustomMessage('');
    setIsSending(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Send Message to {patient.name}
        </h3>
        <p className="text-sm text-gray-600">
          Choose a template or write a custom message
        </p>
      </div>

      {/* Template Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Message Templates
        </label>
        <div className="grid gap-3">
          {messageTemplates.map((template) => (
            <label key={template.id} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="template"
                value={template.id}
                checked={selectedTemplate === template.id}
                onChange={(e) => {
                  setSelectedTemplate(e.target.value);
                  setCustomMessage('');
                }}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-gray-900">{template.name}</div>
                <div className="text-sm text-gray-600">{template.name}</div>
              </div>
            </label>
          ))}

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="radio"
              name="template"
              value=""
              checked={selectedTemplate === ''}
              onChange={() => {
                setSelectedTemplate('');
              }}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-gray-900">Custom Message</div>
              <div className="text-sm text-gray-600">Write your own message</div>
            </div>
          </label>
        </div>
      </div>

      {/* Message Content */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message Content
        </label>
        {selectedTemplate ? (
          <div className="p-3 bg-gray-50 border border-gray-300 rounded-md">
            <p className="text-gray-900">{currentContent}</p>
          </div>
        ) : (
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Write your message here..."
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        )}
      </div>

      {/* Character Count */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-500">
          {currentContent.length} characters
        </span>
        {currentContent.length > 500 && (
          <span className="text-sm text-amber-600">
            Consider shortening for better readability
          </span>
        )}
      </div>

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={!currentContent.trim() || isSending}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black transition-all duration-500 hover:bg-gray-800 disabled:bg-gray-300 group font-bold text-[17px] px-6 py-3 text-yellow-500 rounded-full text-center overflow-hidden"
      >
        <span className="relative z-20 flex justify-center items-center gap-2">
          {isSending ? (
            <>
              Sending...
              <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4" />
            </>
          )}
        </span>
      </button>
    </div>
  );
};