# URCET Campus Chatbot Assistant

A modern, interactive chatbot assistant for Usha Rama College of Engineering and Technology (URCET) built with React, TypeScript, and Vite.

## 🎯 Project Overview

The Campus Chatbot Assistant is designed to help students and staff quickly access information about:
- **Academics**: Class schedules, exam dates, library hours, course information
- **Events**: Technical fests, cultural events, placement drives, workshops
- **Departments**: CSE, ECE, Mechanical, Civil, Electrical engineering details
- **Facilities**: Campus amenities, transportation, hostels, sports facilities

## ✨ Features

- 🤖 Intelligent chatbot with pre-defined responses
- 🎯 Quick action buttons for common queries
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with URCET branding
- ⚡ Fast performance with Vite
- 🔍 Smart keyword-based response matching
- 💬 Real-time chat interface with typing indicators

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with modern features (Grid, Flexbox)
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript strict mode

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CampusChatBot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Chatbot.tsx     # Main chatbot component
│   ├── ChatMessage.tsx # Individual message component
│   ├── ChatInput.tsx   # Message input component
│   ├── QuickActions.tsx# Quick action buttons
│   ├── Header.tsx      # Page header
│   └── WelcomeSection.tsx # Welcome section
├── data/               # Static data
│   └── chatbotData.ts  # Chatbot responses and actions
├── services/           # Business logic
│   └── chatbotService.ts # Chatbot service logic
├── types/              # TypeScript type definitions
│   └── chatbot.ts      # Interface definitions
└── assets/             # Static assets
```

## 🎨 Customization

### Adding New Responses
Edit `src/data/chatbotData.ts` to add new responses:

```typescript
{
  id: 'new-response',
  text: 'Your response text here',
  category: 'academics', // or 'events', 'departments', 'facilities', 'general'
  keywords: ['keyword1', 'keyword2', 'phrase with spaces']
}
```

### Adding Quick Actions
Add new quick action buttons in the same file:

```typescript
{
  id: 'new-action',
  label: 'Button Label',
  category: 'academics',
  query: 'search query'
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎓 About URCET

Usha Rama College of Engineering and Technology is located in Telaprolu, near Vijayawada, Andhra Pradesh. The college is affiliated with JNTUA and approved by AICTE, offering undergraduate programs in various engineering disciplines.
