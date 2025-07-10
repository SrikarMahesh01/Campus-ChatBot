import { GoogleGenerativeAI } from '@google/generative-ai';

const genai = new GoogleGenerativeAI('AIzaSyCH9DKfP8I5XH3vqzzY5URXNgOjYiRT8nY');
const model = genai.getGenerativeModel({ model: 'gemini-pro' });

export const getGeneralResponse = async (userInput: string): Promise<string> => {
  try {
    const result = await model.generateContent(userInput);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return 'I apologize, but I am having trouble processing your request at the moment.';
  }
};

const greetings = [
  'hello',
  'hi',
  'hey',
  'good morning',
  'good afternoon',
  'good evening',
  "what's up",
  'howdy',
];

export const isGeneralQuery = (message: string): boolean => {
  const lowercaseMessage = message.toLowerCase();
  return greetings.some((greeting) => lowercaseMessage.includes(greeting));
};
