import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatResponse } from '../types/chatbot';
import { chatbotData } from '../data/chatbotData';

export class ChatbotService {
  private responses: ChatResponse[] = chatbotData.responses;
  private genAI: GoogleGenerativeAI;
  private model: any;
  private readonly GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCH9DKfP8I5XH3vqzzY5URXNgOjYiRT8nY';

  constructor() {
    this.genAI = new GoogleGenerativeAI(this.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  private getCollegeContext(): string {
    return `
You are a helpful campus assistant for Usha Rama College of Engineering and Technology (URCET). 
You should only answer questions related to college, engineering education, campus life, academics, and student services.

URCET Information:
- Name: Usha Rama College of Engineering and Technology
- Type: Engineering College
- Accreditations: NAAC, AICTE approved, affiliated with JNTUK, ISO 21001:2018 certified
- Departments: Computer Science, Electronics, Mechanical, Civil, Electrical Engineering
- Facilities: Hostels, Transportation, Sports facilities, Library, Labs
- Campus life includes: Technical fests, Cultural activities, Student clubs

Guidelines for responses:
1. Keep responses focused on college-related topics only
2. If asked about non-college topics, politely redirect to college-related queries
3. Be helpful, informative, and friendly
4. Keep responses concise but informative
5. If you don't have specific information, suggest contacting the college administration

Please respond to student/visitor queries about URCET in a helpful manner.
`;
  }

  public async generateResponse(query: string): Promise<ChatResponse> {
    try {
      // First priority: Check predefined responses
      const predefinedResponse = this.findResponse(query);
      if (predefinedResponse) {
        return predefinedResponse;
      }

      // Second priority: Use Gemini AI for dynamic responses
      const prompt = `${this.getCollegeContext()}\n\nStudent Question: ${query}\n\nResponse:`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        id: `gemini-${Date.now()}`,
        text: text.trim(),
        category: 'general',
        keywords: [query.toLowerCase()]
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return this.getDefaultResponse();
    }
  }

  public findResponse(query: string): ChatResponse | null {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Score-based matching for better accuracy
    let bestMatch: ChatResponse | null = null;
    let bestScore = 0;

    for (const response of this.responses) {
      let score = 0;
      
      // Exact keyword matches get highest score
      for (const keyword of response.keywords) {
        const keywordLower = keyword.toLowerCase();
        
        // Full keyword match
        if (normalizedQuery.includes(keywordLower)) {
          score += keywordLower.length * 3; // Higher score for longer, more specific keywords
        }
        
        // Individual word matches (only for multi-word keywords)
        if (keywordLower.includes(' ')) {
          const words = keywordLower.split(' ');
          const matchingWords = words.filter(word => 
            word.length > 2 && normalizedQuery.includes(word)
          );
          score += matchingWords.length * 1;
        }
      }
      
      // Boost score if the response text contains the query (but lower priority)
      if (response.text.toLowerCase().includes(normalizedQuery)) {
        score += 0.5;
      }
      
      // Update best match if this response has a higher score
      if (score > bestScore && score > 0) {
        bestScore = score;
        bestMatch = response;
      }
    }

    return bestMatch;
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
