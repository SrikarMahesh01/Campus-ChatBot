#!/usr/bin/env python3
"""
URCET Website Scraper
This script scrapes content from URCET website pages and saves it for chatbot integration.
"""

import requests
from bs4 import BeautifulSoup
import json
import re
import time

# List of URCET URLs
urls = [
    "https://usharama.edu.in/home",
    "https://usharama.edu.in/aboutUs",
    "https://usharama.edu.in/principalProfile",
    "https://usharama.edu.in/academic-council-members",
    "https://usharama.edu.in/memberships",
    "https://usharama.edu.in/contactUs",
    "https://usharama.edu.in/departments",
    "https://usharama.edu.in/cse-about",
    "https://usharama.edu.in/artificialIntelligenceAndMachineLearning-UG",
    "https://usharama.edu.in/ece-about",
    "https://usharama.edu.in/electricalElectronicsEng",
    "https://usharama.edu.in/informationTechnology",
    "https://usharama.edu.in/mech-about",
    "https://usharama.edu.in/placementCell",
    "https://usharama.edu.in/examination-cell-members",
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

def clean_text(text):
    """Clean and normalize text content"""
    # Remove extra whitespace and normalize line breaks
    text = re.sub(r'\s+', ' ', text)
    # Remove special characters but keep basic punctuation
    text = re.sub(r'[^\w\s.,!?()-]', '', text)
    return text.strip()

def extract_key_info(soup, url):
    """Extract structured information from the page"""
    info = {
        'url': url,
        'title': '',
        'content': '',
        'key_points': [],
        'contact_info': {},
        'lists': []
    }
    
    # Extract title
    title_tag = soup.find('title')
    if title_tag:
        info['title'] = clean_text(title_tag.get_text())
    
    # Remove navigation, footer, and script elements
    for element in soup(['nav', 'footer', 'script', 'style', 'header']):
        element.decompose()
    
    # Extract main content
    main_content = soup.find("main") or soup.find("body")
    if main_content:
        info['content'] = clean_text(main_content.get_text(separator=" "))
    
    # Extract lists (courses, facilities, etc.)
    for ul in soup.find_all(['ul', 'ol']):
        list_items = [clean_text(li.get_text()) for li in ul.find_all('li')]
        if list_items:
            info['lists'].append(list_items)
    
    # Extract contact information
    contact_patterns = {
        'phone': r'(\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})',
        'email': r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})',
        'address': r'(Address[:\s]*[^.]+\.)'
    }
    
    text_content = info['content']
    for key, pattern in contact_patterns.items():
        matches = re.findall(pattern, text_content, re.IGNORECASE)
        if matches:
            info['contact_info'][key] = matches
    
    return info

def scrape_url(url):
    """Scrape a single URL and return structured data"""
    try:
        print(f"Scraping: {url}")
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, "html.parser")
        return extract_key_info(soup, url)
        
    except Exception as e:
        print(f"Error fetching {url}: {str(e)}")
        return {
            'url': url,
            'error': str(e),
            'content': '',
            'title': '',
            'key_points': [],
            'contact_info': {},
            'lists': []
        }

def generate_chatbot_responses(scraped_data):
    """Generate chatbot responses from scraped data"""
    responses = []
    
    # URL to category mapping
    url_categories = {
        'home': 'general',
        'aboutUs': 'general',
        'principalProfile': 'general',
        'academic-council': 'academics',
        'memberships': 'general',
        'contactUs': 'general',
        'departments': 'academics',
        'cse-about': 'academics',
        'artificialIntelligence': 'academics',
        'ece-about': 'academics',
        'electrical': 'academics',
        'informationTechnology': 'academics',
        'mech-about': 'academics',
        'placementCell': 'placements',
        'examination-cell': 'academics'
    }
    
    for i, data in enumerate(scraped_data):
        if data.get('error') or not data.get('content'):
            continue
            
        # Determine category from URL
        category = 'general'
        for key, cat in url_categories.items():
            if key in data['url']:
                category = cat
                break
        
        # Generate keywords from URL and content
        url_keywords = data['url'].split('/')[-1].lower()
        content_keywords = []
        
        # Extract important words from content (first 200 words)
        words = data['content'].lower().split()[:200]
        important_words = [word for word in words if len(word) > 3 and word.isalpha()]
        content_keywords.extend(important_words[:20])  # Limit keywords
        
        # Create response
        response = {
            'id': f'scraped-{i+1}',
            'text': data['content'][:500] + '...' if len(data['content']) > 500 else data['content'],
            'category': category,
            'keywords': list(set(content_keywords)),
            'source_url': data['url'],
            'title': data['title']
        }
        
        # Add contact info if available
        if data['contact_info']:
            response['contact_info'] = data['contact_info']
        
        responses.append(response)
    
    return responses

def main():
    """Main scraping function"""
    print("🚀 Starting URCET Website Scraping...")
    print(f"📊 Scraping {len(urls)} URLs...")
    
    scraped_data = []
    
    for url in urls:
        data = scrape_url(url)
        scraped_data.append(data)
        time.sleep(1)  # Be respectful to the server
    
    # Save raw scraped data
    with open("urcet_scraped_data.json", "w", encoding="utf-8") as f:
        json.dump(scraped_data, f, indent=2, ensure_ascii=False)
    
    # Generate chatbot responses
    chatbot_responses = generate_chatbot_responses(scraped_data)
    
    # Save chatbot-ready data
    with open("urcet_chatbot_responses.json", "w", encoding="utf-8") as f:
        json.dump(chatbot_responses, f, indent=2, ensure_ascii=False)
    
    # Create a simple text file with all content
    with open("urcet_website_content.txt", "w", encoding="utf-8") as f:
        for data in scraped_data:
            if not data.get('error'):
                f.write(f"\n\n===== {data['url']} =====\n")
                f.write(f"Title: {data['title']}\n\n")
                f.write(f"{data['content']}\n")
                
                if data['contact_info']:
                    f.write("\nContact Information:\n")
                    for key, values in data['contact_info'].items():
                        f.write(f"{key.title()}: {', '.join(values)}\n")
    
    print(f"✅ Scraping complete!")
    print(f"📄 Raw data saved to: urcet_scraped_data.json")
    print(f"🤖 Chatbot responses saved to: urcet_chatbot_responses.json")
    print(f"📝 Text content saved to: urcet_website_content.txt")
    print(f"📊 Successfully scraped {len([d for d in scraped_data if not d.get('error')])} pages")

if __name__ == "__main__":
    main()
