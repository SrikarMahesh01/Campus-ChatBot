import { useState, useRef, useEffect } from 'react'
import { Header } from './components/Header'
import { WelcomeSection } from './components/WelcomeSection'
import { Chatbot } from './components/Chatbot'
import './App.css'

function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const chatbotRef = useRef<{ openChat: () => void }>(null)
  const scrollPositionRef = useRef(0)

  // Disable/enable body scroll when chatbot opens/closes
  useEffect(() => {
    if (chatOpen) {
      // Save current scroll position
      scrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop
      
      // Disable scrolling by adding class and inline styles
      document.documentElement.classList.add('scroll-disabled')
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
      document.body.style.top = `-${scrollPositionRef.current}px`
    } else {
      // Enable scrolling by removing class and resetting styles
      document.documentElement.classList.remove('scroll-disabled')
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
      document.body.style.top = ''
      
      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current)
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.documentElement.classList.remove('scroll-disabled')
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
      document.body.style.top = ''
    }
  }, [chatOpen])

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
