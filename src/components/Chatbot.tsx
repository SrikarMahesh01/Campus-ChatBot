import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minimize2, Zap } from 'lucide-react';
import type { Message } from '../types/chatbot';
import { ChatbotService } from '../services/chatbotService';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { QuickActions } from './QuickActions';
import './Chatbot.css';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotService = useRef(new ChatbotService());

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        text: 'Hello! Welcome to URCET Campus Assistant. I can help you with information about academics, events, departments, and campus facilities. How can I assist you today?',
        sender: 'bot',
        timestamp: new Date(),
        category: 'general'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const addMessage = (text: string, sender: 'user' | 'bot', category?: string) => {
    const newMessage: Message = {
      id: generateId(),
      text,
      sender,
      timestamp: new Date(),
      category
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (userMessage: string) => {
    // Add user message
    addMessage(userMessage, 'user');
    
    // Hide quick actions when user sends a message
    setShowQuickActions(false);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get bot response
    const response = chatbotService.current.findResponse(userMessage) || 
                    chatbotService.current.getDefaultResponse();
    
    setIsTyping(false);
    addMessage(response.text, 'bot', response.category);
  };

  const handleQuickAction = (query: string) => {
    setShowQuickActions(false);
    handleSendMessage(query);
  };

  const toggleQuickActions = () => {
    setShowQuickActions(!showQuickActions);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={toggleChat}>
          <MessageCircle size={24} />
          <span className="chat-badge">💬</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`chat-window ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">🎓</div>
              <div>
                <h3 className="chat-title">URCET Assistant</h3>
                <p className="chat-subtitle">Online • Ready to help</p>
              </div>
            </div>
            <div className="chat-controls">
              <button className="control-btn" onClick={toggleMinimize}>
                <Minimize2 size={16} />
              </button>
              <button className="control-btn" onClick={toggleChat}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              <div className="chat-messages">
                {messages.map(message => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && (
                  <div className="typing-indicator">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="typing-text">URCET Assistant is typing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions Toggle Button */}
              <div className="chat-actions">
                <button 
                  className={`quick-actions-toggle ${showQuickActions ? 'active' : ''}`}
                  onClick={toggleQuickActions}
                >
                  <Zap size={16} />
                  <span>{showQuickActions ? 'Hide Quick Actions' : 'Show Quick Actions'}</span>
                </button>
              </div>

              {/* Quick Actions Panel */}
              {showQuickActions && (
                <div className="quick-actions-panel">
                  <QuickActions onActionClick={handleQuickAction} />
                </div>
              )}

              {/* Input */}
              <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
            </>
          )}
        </div>
      )}
    </>
  );
}
