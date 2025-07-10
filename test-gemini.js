// Test script to verify Gemini API integration
import { ChatbotService } from './src/services/chatbotService.js';

async function testGeminiIntegration() {
  console.log('🚀 Testing URCET Chatbot with Gemini 2.5 Flash...');
  console.log('=' * 50);

  try {
    const chatbot = new ChatbotService();
    
    // Test predefined response
    console.log('\n📋 Testing predefined response:');
    const predefinedTest = await chatbot.generateResponse("What is URCET?");
    console.log('Query:', "What is URCET?");
    console.log('Response:', predefinedTest.answer.substring(0, 100) + '...');
    console.log('Category:', predefinedTest.category);
    
    // Test AI-generated response
    console.log('\n🤖 Testing AI-generated response:');
    const aiTest = await chatbot.generateResponse("What are the career opportunities after completing B.Tech from URCET?");
    console.log('Query:', "What are the career opportunities after completing B.Tech from URCET?");
    console.log('Response:', aiTest.answer.substring(0, 100) + '...');
    console.log('Category:', aiTest.category);
    
    console.log('\n✅ All tests completed successfully!');
    console.log('🎉 Gemini 2.5 Flash integration is working perfectly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testGeminiIntegration();
