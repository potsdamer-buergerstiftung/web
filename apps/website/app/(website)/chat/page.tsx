import { Metadata } from 'next';
import ChatInterface from '@components/ChatInterface';

export const metadata: Metadata = {
  title: 'Chat-Assistent - Potsdamer Bürgerstiftung',
  description: 'Stellen Sie Fragen zu unseren Projekten, Veranstaltungen und weiteren Informationen.',
};

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto mt-16">
        <ChatInterface />
      </div>
    </div>
  );
}

