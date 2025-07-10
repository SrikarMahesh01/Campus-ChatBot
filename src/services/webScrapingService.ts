import axios from 'axios';
import * as cheerio from 'cheerio';

export class WebScrapingService {
  private readonly baseUrl = 'https://usharama.edu.in';
  private scrapedContent: { [url: string]: string } = {};

  async scrapeWebsite(url: string): Promise<string> {
    try {
      // Check if content is already scraped
      if (this.scrapedContent[url]) {
        return this.scrapedContent[url];
      }

      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Remove script tags, style tags, and other non-content elements
      $('script').remove();
      $('style').remove();
      $('nav').remove();
      $('footer').remove();
      $('header').remove();

      // Extract text content from main content areas
      const content = $('main, .content, article, .page-content, .post-content')
        .text()
        .replace(/\s+/g, ' ')
        .trim();

      // Cache the scraped content
      this.scrapedContent[url] = content;
      return content;
    } catch (error) {
      console.error('Error scraping website:', error);
      return '';
    }
  }

  async searchRelevantPages(query: string): Promise<string[]> {
    const relevantUrls = [
      `${this.baseUrl}/home`,
      `${this.baseUrl}/about`,
      `${this.baseUrl}/departments`,
      `${this.baseUrl}/academics`,
      `${this.baseUrl}/facilities`,
      `${this.baseUrl}/placements`,
      // Add more relevant URLs as needed
    ];

    const results: string[] = [];
    
    for (const url of relevantUrls) {
      try {
        const content = await this.scrapeWebsite(url);
        if (this.isRelevant(content, query)) {
          results.push(content);
        }
      } catch (error) {
        console.error(`Error searching ${url}:`, error);
      }
    }

    return results;
  }

  private isRelevant(content: string, query: string): boolean {
    // Simple relevance check using keywords
    const keywords = query.toLowerCase().split(' ');
    const contentLower = content.toLowerCase();
    
    return keywords.some(keyword => 
      contentLower.includes(keyword) && keyword.length > 3
    );
  }
}
