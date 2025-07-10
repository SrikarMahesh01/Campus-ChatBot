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

URCET Detailed Information:
- Full Name: Usha Rama College of Engineering and Technology
- Established: 2008 by Usha Rama Educational Academy
- Accreditations: NAAC A Grade, AICTE approved, affiliated with JNTU-Kakinada, ISO 21001:2018 certified
- Sponsorship: Chicago-based Multi Million Dollar Advansoft group
- Location: NH-16, Telaprolu village, 30 kms from Vijayawada towards Eluru, near Gannavaram Airport

Leadership Team:
- Chairman: Sri Sunkara Ramabrahmam
- Vice President: Sri Arun Lanka
- Secretary & Correspondent: Sri Anil Sunkara
- Member: Sri Ajay Sunkara

Principal: Dr. G V K S V Prasad
- Doctorate from NIT Warangal
- 36 years of teaching, consultancy and research experience
- Multiple awards including University Appreciation award from JNTUK (2024)

Vice Principal: Dr. A Madana Mohan Rao
- Assists Principal in academic administration
- Key role in maintaining academic standards

Department Heads (HODs):
- AI Department: Dr. K P N V Satya Sree
- CSE Department: Dr. Roychoudri Subramani
- ECE Department: Dr. Battula Nancharaiah
- IT Department: Kandula Nagendra Vara Prasad
- EEE Department: Dr. Kelothu Naresh

Contact Information:
- Phone: 0866-2527558, 2527565
- Mobile: 9949712255
- Email: principal@usharama.edu.in

Departments & Courses:
B.Tech Programs:
- Computer Science Engineering (since 2008)
- Artificial Intelligence & Machine Learning
- Artificial Intelligence & Data Science  
- Electronics & Communication Engineering (with VLSI & Embedded Systems labs)
- Electrical & Electronics Engineering (with IEEE Student Branch)
- Information Technology
- Mechanical Engineering (established 2010, 90 seats)

Polytechnic (Diploma) Programs:
- Computer Science, ECE, EEE, Mechanical, Civil Engineering

Key Features:
- State-of-the-art laboratories and infrastructure
- Research facilities and centers of excellence
- Industry collaborations
- Active placement cell with top recruiters
- Modern campus with all facilities

Recent Campus Recruiters:
- Hyundai & Kia Motors (2023), Swan Technologies
- IBM, TCS, Wipro, Cognizant, Tech Mahindra, Infosys
- Effectronics, Zen Technologies, Global Logic, Just Dial

Guidelines for responses:
1. Use the detailed information provided above to answer questions accurately
2. Keep responses focused on college-related topics only
3. If asked about non-college topics, politely redirect to college-related queries
4. Be helpful, informative, and friendly
5. Keep responses concise but informative
6. Always mention specific details when available (like contact numbers, exact location, etc.)
7. If you don't have specific information, suggest contacting the college administration

Please respond to student/visitor queries about URCET in a helpful manner using the detailed information provided.
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
        
        // Exact match gets very high score
        if (normalizedQuery === keywordLower) {
          score += keywordLower.length * 10;
        }
        // Full keyword match (contains)
        else if (normalizedQuery.includes(keywordLower)) {
          score += keywordLower.length * 3;
        }
        // Reverse match (keyword contains query)
        else if (keywordLower.includes(normalizedQuery) && normalizedQuery.length > 3) {
          score += normalizedQuery.length * 2;
        }
        
        // Individual word matches (only for multi-word keywords)
        if (keywordLower.includes(' ')) {
          const words = keywordLower.split(' ');
          const queryWords = normalizedQuery.split(' ');
          const matchingWords = words.filter(word => 
            word.length > 2 && queryWords.some(qWord => qWord.includes(word) || word.includes(qWord))
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
