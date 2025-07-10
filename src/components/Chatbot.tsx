import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MessageCircle, X, Minimize2, Zap } from 'lucide-react';
import type { Message } from '../types/chatbot';
import { ChatbotService } from '../services/chatbotService';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { QuickActions } from './QuickActions';
import './Chatbot.css';

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface ChatbotRef {
  openChat: () => void;
}

export const Chatbot = forwardRef<ChatbotRef, ChatbotProps>(({ isOpen, setIsOpen }, ref) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotService = useRef(new ChatbotService());

  useImperativeHandle(ref, () => ({
    openChat: () => {
      setIsOpen(true);
      setIsMinimized(false);
    }
  }));

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        text: 'Hello! Welcome to URCET Campus Assistant. I can help you with information about academics, events, departments, facilities, admissions, and campus life at Usha Rama College of Engineering and Technology. How can I assist you today?',
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
    
    // Add a small delay before showing typing indicator for more natural feel
    setTimeout(() => {
      setIsTyping(true);
    }, 300);
    
    try {
      // Get AI response using Gemini API
      const response = await chatbotService.current.generateResponse(userMessage);
      
      // Add a minimum delay to show the typing animation (even for quick responses)
      const minDelay = 1000; // 1 second minimum
      setTimeout(() => {
        setIsTyping(false);
        addMessage(response.answer, 'bot', response.category);
      }, minDelay);
      
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Ensure typing indicator is hidden even on error
      setTimeout(() => {
        setIsTyping(false);
        
        // Fallback to default response
        const fallbackResponse = chatbotService.current.getDefaultResponse();
        addMessage(fallbackResponse.answer, 'bot', fallbackResponse.category);
      }, 800);
    }
  };

  const handleQuickAction = (query: string) => {
    // Don't hide quick actions when clicking on action buttons
    // Only hide when explicitly clicking "Hide Quick Actions"
    handleSendMessage(query);
  };

  const toggleQuickActions = () => {
    setShowQuickActions(!showQuickActions);
  };

  const hideQuickActions = () => {
    setShowQuickActions(false);
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
        <div className={`chat-window ${isMinimized ? 'minimized' : ''} ${showQuickActions ? 'expanded' : ''}`}>
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
            <div className="chat-content-wrapper">
              {/* Quick Actions Panel - Left Side */}
              {showQuickActions && (
                <div className="quick-actions-sidebar">
                  <QuickActions onActionClick={handleQuickAction} onHide={hideQuickActions} />
                </div>
              )}
              
              {/* Main Chat Content */}
              <div className="chat-main-content">
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
                    <Zap size={18} />
                    <span>{showQuickActions ? 'Quick Actions Panel Open' : 'Open Quick Actions'}</span>
                  </button>
                </div>

                {/* Input */}
                <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
});

Chatbot.displayName = 'Chatbot';
