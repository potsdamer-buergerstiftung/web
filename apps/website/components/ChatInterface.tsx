'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useCallback } from 'react';
import ChatMessages from './ChatWidget/ChatMessages';
import ChatInput from './ChatWidget/ChatInput';

export default function ChatInterface() {
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const handleSend = useCallback((text: string) => {
    sendMessage({ text });
  }, [sendMessage]);

  const handleStarterClick = useCallback((text: string) => {
    sendMessage({ text });
  }, [sendMessage]);

  return (
    <div className="flex h-[700px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
      {/* Error Message */}
      {error && (
        <div className="border-b border-red-200 bg-red-50 px-4 py-3">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 shrink-0 text-red-600"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">
                Es ist ein Fehler aufgetreten
              </p>
              <p className="mt-1 text-xs text-red-700">
                Bitte versuche es erneut.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="text-sm font-medium text-red-800 hover:text-red-900"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      )}

      <ChatMessages messages={messages} onStarterClick={handleStarterClick} />

      <ChatInput
        onSend={handleSend}
        onStop={stop}
        status={status}
        disabled={error !== undefined}
      />
    </div>
  );
}

