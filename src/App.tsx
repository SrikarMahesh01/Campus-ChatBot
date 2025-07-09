import { Header } from './components/Header'
import { WelcomeSection } from './components/WelcomeSection'
import { Chatbot } from './components/Chatbot'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <WelcomeSection />
      </main>
      <Chatbot />
    </div>
  )
}

export default App
