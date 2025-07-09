import type { ChatResponse } from '../types/chatbot';
import { chatbotData } from '../data/chatbotData';

export class ChatbotService {
  private responses: ChatResponse[] = chatbotData.responses;

  public findResponse(query: string): ChatResponse | null {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Find exact keyword matches first
    let bestMatch = this.responses.find(response =>
      response.keywords.some(keyword => 
        normalizedQuery.includes(keyword.toLowerCase())
      )
    );

    // If no exact match, try partial matches
    if (!bestMatch) {
      bestMatch = this.responses.find(response =>
        response.keywords.some(keyword => {
          const words = keyword.toLowerCase().split(' ');
          return words.some(word => normalizedQuery.includes(word));
        })
      );
    }

    // If still no match, try searching in response text
    if (!bestMatch) {
      bestMatch = this.responses.find(response =>
        response.text.toLowerCase().includes(normalizedQuery)
      );
    }

    return bestMatch || null;
  }

  public getResponsesByCategory(category: string): ChatResponse[] {
    return this.responses.filter(response => response.category === category);
  }

  public getAllCategories(): string[] {
    const categories = new Set(this.responses.map(response => response.category));
    return Array.from(categories);
  }

  public searchResponses(query: string): ChatResponse[] {
    const normalizedQuery = query.toLowerCase().trim();
    
    return this.responses.filter(response =>
      response.keywords.some(keyword => 
        keyword.toLowerCase().includes(normalizedQuery)
      ) ||
      response.text.toLowerCase().includes(normalizedQuery)
    );
  }

  public getDefaultResponse(): ChatResponse {
    return {
      id: 'default',
      text: "I'm sorry, I couldn't find specific information about that. Please try asking about academics, events, departments, or campus facilities. You can also use the quick action buttons below for common queries.",
      category: 'general',
      keywords: []
    };
  }
}
