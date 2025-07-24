import type { Message } from '../types/chatbot';
import { Bot, Sparkles } from 'lucide-react';
import './ChatMessage.css';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isAIGenerated = message.text.includes('category: AI Generated') || 
                       message.sender === 'bot' && message.text.length > 200;

  return (
    <div className={`chat-message ${message.sender}`}>
      <div className="message-content">
        {message.sender === 'bot' && (
          <div className="bot-indicator">
            {isAIGenerated ? (
              <><Sparkles size={16} className="ai-icon" /> AI Response</>
            ) : (
              <><Bot size={16} className="bot-icon" /> Quick Response</>
            )}
          </div>
        )}
        {message.sender === 'bot' ? (
          (() => {
            const lines = message.text.split(/\r?\n/).filter(line => line.trim() !== '');
            if (lines.length > 1) {
              return (
                <ul className="message-bullets">
                  {lines.map((line, idx) => {
                    // Remove leading bullet characters and whitespace
                    const cleanedLine = line.replace(/^([•\-\s]+)(?=\S)/, '');
                    return (
                      <li key={idx}>{cleanedLine}</li>
                    );
                  })}
                </ul>
              );
            } else {
              return <div className="message-text">{message.text}</div>;
            }
          })()
        ) : (
          <div className="message-text">{message.text}</div>
        )}
        <div className="message-time">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
}
