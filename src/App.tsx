import { useState, useRef } from 'react'
import { Header } from './components/Header'
import { WelcomeSection } from './components/WelcomeSection'
import { Chatbot } from './components/Chatbot'
import './App.css'

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const chatbotRef = useRef<{ openChat: () => void }>(null)

  const handleStartChatting = () => {
    setChatOpen(true)
    chatbotRef.current?.openChat()
  }

  return (
    <div className="app">
      <Header />
      <main>
        <WelcomeSection onStartChatting={handleStartChatting} />
      </main>
      <Chatbot ref={chatbotRef} isOpen={chatOpen} setIsOpen={setChatOpen} />
    </div>
  )
}

export default App
