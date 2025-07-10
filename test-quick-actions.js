// Quick Actions Test File
// This file tests if all quick actions trigger the correct responses

import { chatbotData } from './src/data/chatbotData.js';

// Simulate the findResponse function
function findResponse(query) {
  const normalizedQuery = query.toLowerCase().trim();
  
  let bestMatch = null;
  let bestScore = 0;

  for (const response of chatbotData.responses) {
    let score = 0;
    
    for (const keyword of response.keywords) {
      const keywordLower = keyword.toLowerCase();
      
      if (normalizedQuery.includes(keywordLower)) {
        score += keywordLower.length * 3;
      }
      
      if (keywordLower.includes(' ')) {
        const words = keywordLower.split(' ');
        const matchingWords = words.filter(word => 
          word.length > 2 && normalizedQuery.includes(word)
        );
        score += matchingWords.length * 1;
      }
    }
    
    if (response.text.toLowerCase().includes(normalizedQuery)) {
      score += 0.5;
    }
    
    if (score > bestScore && score > 0) {
      bestScore = score;
      bestMatch = response;
    }
  }

  return bestMatch;
}

// Test all quick actions
console.log('🧪 Testing Quick Actions...\n');

chatbotData.quickActions.forEach((quickAction, index) => {
  console.log(`${index + 1}. Testing: "${quickAction.label}" with query: "${quickAction.query}"`);
  
  const response = findResponse(quickAction.query);
  
  if (response) {
    console.log(`   ✅ Found response: ${response.id}`);
    console.log(`   📝 Response preview: ${response.text.substring(0, 100)}...`);
  } else {
    console.log(`   ❌ NO RESPONSE FOUND!`);
  }
  console.log('');
});

console.log('🎯 Quick Actions Test Complete!');
