import { UIMessage } from 'ai';
import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

interface ChatMessagesProps {
  messages: UIMessage[];
  onStarterClick: (text: string) => void;
}

const conversationStarters = [
  'Wie kann ich mich ehrenamtlich engagieren?',
  'Welche Projekte unterstützt die Bürgerstiftung?',
  'Wie kann ich spenden?',
  'Gibt es aktuelle Veranstaltungen?',
];

export default function ChatMessages({ messages, onStarterClick }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 pb-2">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7 text-emerald-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </div>
        <p className="mb-4 max-w-md text-center text-sm text-slate-600">
          Ich bin dein digitaler Assistent der Potsdamer Bürgerstiftung. 
          Frag mich alles über Projekte, Ehrenamtsmöglichkeiten und wie du mitmachen kannst!
        </p>
        <div className="w-full max-w-md space-y-2">
          <p className="mb-2 text-sm font-medium text-slate-700">
            Beliebte Fragen:
          </p>
          {conversationStarters.map((starter, index) => (
            <button
              key={index}
              onClick={() => onStarterClick(starter)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {starter}
            </button>
          ))}
          <div className="pt-3 text-center">
            <p className="text-xs text-slate-500">
              ... oder stelle deine eigene Frage unten ↓
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <ChatMessage key={message.id || `message-${index}`} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

