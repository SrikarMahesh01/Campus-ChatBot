export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  category?: string;
}

export interface ChatResponse {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export interface QuickAction {
  id: string;
  label: string;
  category: string;
  query: string;
  externalLink?: string;
}

export type ChatCategory = 'academics' | 'events' | 'departments' | 'facilities' | 'general';

export interface ChatbotData {
  responses: ChatResponse[];
  quickActions: QuickAction[];
}
