#!/usr/bin/env python3
"""
Process scraped URCET data and generate enhanced chatbot responses
"""

import json
import re
from typing import List, Dict, Any

def clean_and_process_scraped_data():
    """Process the scraped data and create meaningful chatbot responses"""
    
    with open('urcet_scraped_data.json', 'r', encoding='utf-8') as f:
        scraped_data = json.load(f)
    
    # Enhanced responses based on scraped content
    enhanced_responses = []
    
    # Process each scraped page
    for i, data in enumerate(scraped_data):
        if data.get('error') or not data.get('content'):
            continue
        
        url = data['url']
        content = data['content']
        title = data.get('title', '')
        
        # Extract meaningful information based on URL
        if 'home' in url:
            response = extract_home_page_info(content, i+1)
        elif 'aboutUs' in url:
            response = extract_about_info(content, i+1)
        elif 'departments' in url:
            response = extract_departments_info(content, i+1)
        elif 'cse-about' in url:
            response = extract_cse_info(content, i+1)
        elif 'ece-about' in url:
            response = extract_ece_info(content, i+1)
        elif 'mech-about' in url:
            response = extract_mech_info(content, i+1)
        elif 'electricalElectronicsEng' in url:
            response = extract_eee_info(content, i+1)
        elif 'informationTechnology' in url:
            response = extract_it_info(content, i+1)
        elif 'artificialIntelligence' in url:
            response = extract_aiml_info(content, i+1)
        elif 'placementCell' in url:
            response = extract_placement_info(content, i+1)
        elif 'contactUs' in url:
            response = extract_contact_info(content, i+1)
        elif 'principalProfile' in url:
            response = extract_principal_info(content, i+1)
        else:
            continue
        
        if response:
            response['source_url'] = url
            enhanced_responses.append(response)
    
    return enhanced_responses

def extract_key_sentences(content: str, keywords: List[str], max_sentences: int = 3) -> str:
    """Extract key sentences containing specific keywords"""
    sentences = re.split(r'[.!?]+', content)
    relevant_sentences = []
    
    for sentence in sentences:
        for keyword in keywords:
            if keyword.lower() in sentence.lower() and len(sentence.strip()) > 20:
                relevant_sentences.append(sentence.strip())
                break
        if len(relevant_sentences) >= max_sentences:
            break
    
    return '. '.join(relevant_sentences[:max_sentences])

def extract_home_page_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract home page information"""
    keywords = ['approved', 'aicte', 'affiliated', 'jntu', 'established', 'advansoft', 'chicago']
    text = extract_key_sentences(content, keywords, 4)
    
    return {
        'id': f'enhanced-home-{id_num}',
        'text': text or 'URCET is approved by AICTE, affiliated to JNTU-Kakinada, and sponsored by Chicago-based Advansoft group.',
        'category': 'general',
        'keywords': ['urcet overview', 'about urcet', 'college information', 'approved', 'aicte', 'jntu affiliated', 'advansoft', 'chicago sponsorship']
    }

def extract_about_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract about us information"""
    keywords = ['mission', 'vision', 'educational', 'academy', 'established', 'technocrats']
    text = extract_key_sentences(content, keywords, 4)
    
    return {
        'id': f'enhanced-about-{id_num}',
        'text': text or 'URCET was established by Usha Rama Educational Academy with the aim of providing quality education and producing skilled technocrats.',
        'category': 'general',
        'keywords': ['about urcet', 'mission', 'vision', 'educational academy', 'established', 'quality education', 'technocrats']
    }

def extract_departments_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract departments information"""
    keywords = ['department', 'engineering', 'course', 'program', 'bachelor', 'master']
    text = extract_key_sentences(content, keywords, 5)
    
    return {
        'id': f'enhanced-departments-{id_num}',
        'text': text or 'URCET offers various engineering departments including CSE, ECE, EEE, Mechanical, Information Technology, and AI & ML.',
        'category': 'academics',
        'keywords': ['departments', 'engineering programs', 'courses offered', 'academic departments', 'btech courses', 'engineering disciplines']
    }

def extract_cse_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract CSE department information"""
    keywords = ['computer science', 'software', 'programming', 'technology', 'lab', 'faculty']
    text = extract_key_sentences(content, keywords, 4)
    
    return {
        'id': f'enhanced-cse-{id_num}',
        'text': text or 'The Computer Science Engineering department at URCET focuses on software development, programming, and modern computing technologies.',
        'category': 'academics',
        'keywords': ['cse department', 'computer science engineering', 'software development', 'programming', 'cse course', 'computer science']
    }

def extract_ece_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract ECE department information"""
    keywords = ['electronics', 'communication', 'circuits', 'signals', 'embedded', 'vlsi']
    text = extract_key_sentences(content, keywords, 4)
    
    return {
        'id': f'enhanced-ece-{id_num}',
        'text': text or 'The Electronics and Communication Engineering department covers electronics, communication systems, and embedded technologies.',
        'category': 'academics',
        'keywords': ['ece department', 'electronics communication engineering', 'electronics', 'communication', 'embedded systems', 'vlsi']
    }

def extract_mech_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract Mechanical department information"""
    keywords = ['mechanical', 'manufacturing', 'design', 'thermal', 'machines', 'automation']
    text = extract_key_sentences(content, keywords, 4)
    
    return {
        'id': f'enhanced-mech-{id_num}',
        'text': text or 'The Mechanical Engineering department focuses on design, manufacturing, thermal systems, and industrial automation.',
        'category': 'academics',
        'keywords': ['mechanical engineering', 'mech department', 'manufacturing', 'design', 'thermal systems', 'industrial automation']
    }

def extract_eee_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract EEE department information"""
    keywords = ['electrical', 'electronics', 'power', 'control', 'systems', 'energy']
    text = extract_key_sentences(content, keywords, 4)
    
    return {
        'id': f'enhanced-eee-{id_num}',
        'text': text or 'The Electrical and Electronics Engineering department covers power systems, control systems, and energy technologies.',
        'category': 'academics',
        'keywords': ['eee department', 'electrical electronics engineering', 'power systems', 'control systems', 'electrical engineering']
    }

def extract_it_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract IT department information"""
    keywords = ['information technology', 'networks', 'database', 'web', 'systems', 'software']
    text = extract_key_sentences(content, keywords, 4)
    
    return {
        'id': f'enhanced-it-{id_num}',
        'text': text or 'The Information Technology department focuses on networks, databases, web technologies, and software systems.',
        'category': 'academics',
        'keywords': ['it department', 'information technology', 'networks', 'database', 'web development', 'software systems']
    }

def extract_aiml_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract AI & ML department information"""
    keywords = ['artificial intelligence', 'machine learning', 'data science', 'algorithms', 'neural', 'deep learning']
    text = extract_key_sentences(content, keywords, 4)
    
    return {
        'id': f'enhanced-aiml-{id_num}',
        'text': text or 'The Artificial Intelligence and Machine Learning department covers AI algorithms, data science, and deep learning technologies.',
        'category': 'academics',
        'keywords': ['ai ml department', 'artificial intelligence', 'machine learning', 'data science', 'ai algorithms', 'deep learning']
    }

def extract_placement_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract placement information"""
    keywords = ['placement', 'companies', 'recruitment', 'jobs', 'career', 'industry']
    text = extract_key_sentences(content, keywords, 5)
    
    return {
        'id': f'enhanced-placement-{id_num}',
        'text': text or 'URCET has an active placement cell that coordinates with various companies for student recruitment and career opportunities.',
        'category': 'placements',
        'keywords': ['placement cell', 'campus placements', 'job opportunities', 'recruitment', 'career placement', 'company visits']
    }

def extract_contact_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract contact information"""
    keywords = ['contact', 'address', 'phone', 'email', 'location', 'reach']
    text = extract_key_sentences(content, keywords, 4)
    
    # Extract phone numbers and emails properly
    phone_pattern = r'(\+91[-\s]?\d{10}|\d{10})'
    email_pattern = r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})'
    
    phones = re.findall(phone_pattern, content)
    emails = re.findall(email_pattern, content)
    
    contact_details = ""
    if phones:
        contact_details += f"Phone: {', '.join(phones[:2])}\n"
    if emails:
        contact_details += f"Email: {', '.join(emails[:2])}\n"
    
    final_text = text
    if contact_details:
        final_text = f"{text}\n\n{contact_details}"
    
    return {
        'id': f'enhanced-contact-{id_num}',
        'text': final_text or 'Contact URCET for admissions and general inquiries. Visit the official website for detailed contact information.',
        'category': 'general',
        'keywords': ['contact urcet', 'contact information', 'phone number', 'email address', 'how to contact', 'reach urcet']
    }

def extract_principal_info(content: str, id_num: int) -> Dict[str, Any]:
    """Extract principal information"""
    keywords = ['principal', 'leadership', 'message', 'experience', 'qualification']
    text = extract_key_sentences(content, keywords, 4)
    
    return {
        'id': f'enhanced-principal-{id_num}',
        'text': text or 'The Principal of URCET provides leadership and guidance to maintain academic excellence and institutional growth.',
        'category': 'general',
        'keywords': ['principal profile', 'principal message', 'leadership', 'academic leadership', 'principal information']
    }

def main():
    """Main processing function"""
    print("🔄 Processing scraped URCET data...")
    
    try:
        enhanced_responses = clean_and_process_scraped_data()
        
        # Save enhanced responses
        with open('enhanced_chatbot_responses.json', 'w', encoding='utf-8') as f:
            json.dump(enhanced_responses, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Enhanced chatbot responses created!")
        print(f"📊 Generated {len(enhanced_responses)} enhanced responses")
        print(f"💾 Saved to: enhanced_chatbot_responses.json")
        
        # Print summary
        categories = {}
        for response in enhanced_responses:
            cat = response['category']
            categories[cat] = categories.get(cat, 0) + 1
        
        print("\n📈 Response Categories:")
        for cat, count in categories.items():
            print(f"  {cat.title()}: {count} responses")
        
    except Exception as e:
        print(f"❌ Error processing data: {e}")

if __name__ == "__main__":
    main()
