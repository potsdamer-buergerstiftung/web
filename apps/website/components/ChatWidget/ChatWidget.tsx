'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from 'ai';
import { useState, useEffect, useCallback } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const STORAGE_KEY = 'mitmach-mate-chat-messages';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const { messages, sendMessage, status, error, stop, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    onFinish: ({ message }) => {
      // Add timestamp to AI message after streaming completes
      setMessages((prev) => {
        // Find and update the last assistant message
        const messageIndex = prev.findLastIndex(m => m.role === 'assistant');
        if (messageIndex >= 0) {
          const updated = [...prev];
          updated[messageIndex] = { ...updated[messageIndex], createdAt: new Date() } as any;
          return updated;
        }
        return prev;
      });
    },
  });

  // Load messages from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedMessages = JSON.parse(stored);
          // Restore messages with proper Date objects
          const restoredMessages = parsedMessages.map((msg: any) => ({
            ...msg,
            createdAt: msg.createdAt ? new Date(msg.createdAt) : undefined,
          }));
          setMessages(restoredMessages);
        }
      } catch (error) {
        console.error('Failed to load chat messages from localStorage:', error);
      }
      setHasLoaded(true);
    }
  }, [setMessages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (hasLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error('Failed to save chat messages to localStorage:', error);
      }
    }
  }, [messages, hasLoaded]);

  const handleSend = useCallback((text: string) => {
    sendMessage({ text });
    
    // Add timestamp to the user message after it's been added
    setTimeout(() => {
      setMessages((prev) => {
        if (prev.length > 0) {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.role === 'user' && !(lastMessage as any).createdAt) {
            updated[updated.length - 1] = { ...lastMessage, createdAt: new Date() } as any;
          }
          return updated;
        }
        return prev;
      });
    }, 10);
  }, [sendMessage, setMessages]);

  const handleStarterClick = useCallback((text: string) => {
    handleSend(text);
  }, [handleSend]);

  const handleClear = () => {
    if (confirm('Möchtest du wirklich das gesamte Gespräch löschen?')) {
      setMessages([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="fixed bottom-6 right-6 z-[1100] flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-opacity-50 md:bottom-8 md:right-8"
          title="Mitmach-Mate öffnen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
              clipRule="evenodd"
            />
          </svg>
          {messages.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
              {messages.length > 9 ? '9+' : messages.length}
            </span>
          )}
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1100] flex items-end justify-end p-0 md:inset-auto md:bottom-8 md:right-8 md:h-[700px] md:w-[480px] md:p-0"
          style={{ maxHeight: '100vh' }}
        >
          <div className="flex h-full w-full flex-col overflow-hidden rounded-none bg-white shadow-2xl md:rounded-2xl">
            <ChatHeader
              onClose={handleClose}
              onClear={handleClear}
              messageCount={messages.length}
            />

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

            <ChatMessages
              messages={messages}
              onStarterClick={handleStarterClick}
            />

            <ChatInput
              onSend={handleSend}
              onStop={stop}
              status={status}
              disabled={error !== undefined}
            />
          </div>
        </div>
      )}
    </>
  );
}

