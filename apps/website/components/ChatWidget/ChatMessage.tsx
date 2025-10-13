import { UIMessage } from 'ai';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';

interface ChatMessageProps {
  message: UIMessage;
}

const markdownComponents: any = {
  p: ({ children }: any) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }: any) => <ul className="mb-2 ml-1 list-disc">{children}</ul>,
  ol: ({ children }: any) => <ol className="mb-2 ml-1 list-decimal">{children}</ol>,
  li: ({ children }: any) => <li className="mb-1">{children}</li>,
  a: ({ href, children }: any) => (
    <a
      href={href}
      className="text-emerald-600 underline hover:text-emerald-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  code: ({ className, children }: any) => {
    const isInline = !className;
    return isInline ? (
      <code className="rounded bg-slate-200 px-1 py-0.5 text-sm font-mono">
        {children}
      </code>
    ) : (
      <code className="block rounded bg-slate-200 p-2 text-sm font-mono overflow-x-auto">
        {children}
      </code>
    );
  },
};

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [expandedTools, setExpandedTools] = useState<Set<number>>(new Set());

  const toggleTool = (index: number) => {
    setExpandedTools(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  // Guard against messages without parts
  if (!message.parts || message.parts.length === 0) {
    return null;
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-100 text-slate-800'
          }`}
        >
          {message.parts.map((part, index) => {
            if (part.type === 'text') {
              return (
                <div key={index} className="prose prose-sm max-w-none">
                  {isUser ? (
                    <p className="text-white whitespace-pre-wrap">{part.text}</p>
                  ) : (
                    <div className="text-slate-800">
                      {/* @ts-expect-error - React 19 type compatibility */}
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {part.text}
                      </Markdown>
                    </div>
                  )}
                </div>
              );
            }

            if (part.type.startsWith('tool-')) {
              const isExpanded = expandedTools.has(index);
              const toolName = part.type.replace('tool-', '');
              const toolPart = part as any;
              const state = toolPart.state || 'input-available';
              const hasOutput = state === 'output-available';
              const hasError = state === 'output-error';
              
              return (
                <div key={index} className="mt-2 rounded border border-slate-300 bg-white text-sm">
                  <button
                    onClick={() => toggleTool(index)}
                    className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4 text-emerald-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                        />
                      </svg>
                      <span className="font-medium text-slate-700">{toolName}</span>
                      {state === 'input-streaming' && (
                        <span className="text-xs text-slate-500">(läuft...)</span>
                      )}
                      {hasOutput && (
                        <span className="text-xs text-emerald-600">✓</span>
                      )}
                      {hasError && (
                        <span className="text-xs text-red-600">✗</span>
                      )}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className="border-t border-slate-200 px-3 py-2">
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-slate-600">Eingabe:</span>
                        <pre className="mt-1 overflow-x-auto rounded bg-slate-50 p-2 text-xs">
                          {JSON.stringify(toolPart.input, null, 2)}
                        </pre>
                      </div>
                      {hasOutput && toolPart.output && (
                        <div>
                          <span className="text-xs font-semibold text-slate-600">Ergebnis:</span>
                          <pre className="mt-1 overflow-x-auto rounded bg-slate-50 p-2 text-xs">
                            {typeof toolPart.output === 'string'
                              ? toolPart.output
                              : JSON.stringify(toolPart.output, null, 2)}
                          </pre>
                        </div>
                      )}
                      {hasError && toolPart.errorText && (
                        <div>
                          <span className="text-xs font-semibold text-red-600">Fehler:</span>
                          <pre className="mt-1 overflow-x-auto rounded bg-red-50 p-2 text-xs text-red-700">
                            {toolPart.errorText}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}

