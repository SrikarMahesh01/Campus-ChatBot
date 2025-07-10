import natural from 'natural';
import type { ChatResponse } from '../types/chatbot';

export class NLPService {
  private tokenizer: natural.WordTokenizer;
  private stemmer: typeof natural.PorterStemmer;
  private tfidf: natural.TfIdf;

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.stemmer = natural.PorterStemmer;
    this.tfidf = new natural.TfIdf();
  }

  public processQuery(query: string): string[] {
    const tokens = this.tokenizer.tokenize(query.toLowerCase()) || [];
    return tokens.map(token => this.stemmer.stem(token));
  }

  public findSimilarResponses(query: string, responses: ChatResponse[]): ChatResponse[] {
    const processedQuery = this.processQuery(query).join(' ');
    
    // Add all responses to TF-IDF
    this.tfidf = new natural.TfIdf();
    responses.forEach(response => {
      const document = `${response.question} ${response.answer} ${response.keywords.join(' ')}`;
      this.tfidf.addDocument(document.toLowerCase());
    });

    // Get similarity scores
    const scores: { index: number; score: number }[] = [];
    this.tfidf.tfidfs(processedQuery, (index: number, score: number) => {
      scores.push({ index, score });
    });

    // Sort by score and get top matches
    scores.sort((a, b) => b.score - a.score);
    return scores
      .filter(score => score.score > 0)
      .slice(0, 3)
      .map(score => responses[score.index]);
  }

  public extractEntities(text: string): { [key: string]: string[] } {
    const entities: { [key: string]: string[] } = {
      departments: [],
      courses: [],
      facilities: [],
      people: [],
    };

    const tokens = this.tokenizer.tokenize(text) || [];
    let i = 0;
    
    while (i < tokens.length) {
      const token = tokens[i].toLowerCase();
      const nextToken = tokens[i + 1]?.toLowerCase();
      const twoTokens = nextToken ? `${token} ${nextToken}` : token;

      // Department detection
      if (token.match(/dept|department/i) || this.isDepartmentName(twoTokens)) {
        if (nextToken && !entities.departments.includes(twoTokens)) {
          entities.departments.push(twoTokens);
        }
      }

      // Course detection
      if (token.match(/btech|mtech|diploma|course/i) || this.isCourseName(twoTokens)) {
        if (!entities.courses.includes(twoTokens)) {
          entities.courses.push(twoTokens);
        }
      }

      // Facility detection
      if (this.isFacility(token)) {
        if (!entities.facilities.includes(token)) {
          entities.facilities.push(token);
        }
      }

      // People detection
      if (this.isPersonTitle(token) && nextToken) {
        const personName = [token];
        let j = i + 1;
        while (j < tokens.length && this.isNamePart(tokens[j])) {
          personName.push(tokens[j]);
          j++;
        }
        const fullName = personName.join(' ');
        if (!entities.people.includes(fullName)) {
          entities.people.push(fullName);
        }
        i = j - 1;
      }

      i++;
    }

    return entities;
  }

  private isDepartmentName(text: string): boolean {
    const departments = [
      'computer science',
      'information technology',
      'artificial intelligence',
      'machine learning',
      'data science',
      'electronics',
      'electrical',
      'mechanical',
      'civil'
    ];
    return departments.some(dept => text.toLowerCase().includes(dept));
  }

  private isCourseName(text: string): boolean {
    const courses = [
      'btech',
      'mtech',
      'diploma',
      'engineering',
      'computer science',
      'artificial intelligence',
      'data science',
      'machine learning'
    ];
    return courses.some(course => text.toLowerCase().includes(course));
  }

  private isFacility(text: string): boolean {
    const facilities = [
      'lab',
      'laboratory',
      'library',
      'hostel',
      'cafeteria',
      'canteen',
      'ground',
      'playground',
      'auditorium',
      'classroom',
      'wifi',
      'transport'
    ];
    return facilities.includes(text.toLowerCase());
  }

  private isPersonTitle(text: string): boolean {
    const titles = ['dr', 'prof', 'mr', 'mrs', 'ms', 'sri', 'smt'];
    return titles.includes(text.toLowerCase());
  }

  private isNamePart(text: string): boolean {
    return /^[A-Za-z]+$/.test(text) && 
           !this.isStopWord(text) && 
           text.length > 1;
  }

  private isStopWord(text: string): boolean {
    const stopWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'];
    return stopWords.includes(text.toLowerCase());
  }

  public calculateSentiment(text: string): { score: number; label: string } {
    const analyzer = new natural.SentimentAnalyzer(
      'English',
      this.stemmer,
      'afinn'
    );
    
    const tokens = this.tokenizer.tokenize(text) || [];
    const score = analyzer.getSentiment(tokens);

    return {
      score,
      label: this.getSentimentLabel(score)
    };
  }

  private getSentimentLabel(score: number): string {
    if (score > 0.3) return 'very positive';
    if (score > 0) return 'positive';
    if (score < -0.3) return 'very negative';
    if (score < 0) return 'negative';
    return 'neutral';
  }
}
