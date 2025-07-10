import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Display startup information
console.log('🎓 URCET Campus Chatbot Loading...');
console.log('🤖 Gemini 2.5 Flash AI Integration: Active');
console.log('🔑 API Key Status:', import.meta.env.VITE_GEMINI_API_KEY ? '✅ Configured' : '❌ Missing');
console.log('🌐 Environment:', import.meta.env.DEV ? 'Development' : 'Production');
console.log('📚 Knowledge Base: Comprehensive URCET Information');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
