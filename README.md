# URCET Campus Chatbot

An intelligent campus assistant for Usha Rama College of Engineering and Technology (URCET), built with React, TypeScript, and Google's Gemini AI.

## 🎯 Features

- **AI-Powered Responses**: Integration with Google Gemini AI for intelligent responses
- **Comprehensive Data**: Detailed information about URCET's departments, courses, faculty, and facilities
- **Quick Actions**: Pre-defined buttons for common queries
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean and intuitive interface with URCET branding
- **Fallback System**: Pre-defined responses when AI is unavailable

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Campus-ChatBot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env file and add your Google Gemini API key
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Get Google Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Chatbot.tsx     # Main chatbot interface
│   ├── ChatInput.tsx   # Message input component
│   ├── ChatMessage.tsx # Message display component
│   ├── Header.tsx      # Application header
│   ├── QuickActions.tsx # Quick action buttons
│   └── WelcomeSection.tsx # Welcome screen
├── data/
│   └── chatbotData.ts  # Static chatbot responses
├── services/
│   ├── chatbotService.ts # Main chatbot logic
│   └── geminiService.ts  # Google Gemini integration
├── types/
│   └── chatbot.ts      # TypeScript interfaces
└── styles/             # CSS files
```

## 🤖 How It Works

1. **User Input**: Users can type questions or use quick action buttons
2. **Response Resolution**: 
   - First checks for exact matches in pre-defined responses
   - If not found, uses Google Gemini AI for intelligent responses
   - Falls back to default response if API fails
3. **Context Awareness**: AI responses include comprehensive URCET context
4. **Real-time Display**: Messages appear instantly with typing indicators

## 📝 Configuration

### Environment Variables

```env
# Required
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional
VITE_APP_NAME=URCET Campus Chatbot
VITE_COLLEGE_NAME=Usha Rama College of Engineering and Technology
```

### Customization

- **Add new responses**: Edit `src/data/chatbotData.ts`
- **Modify AI context**: Update context in `src/services/chatbotService.ts`
- **Change styling**: Edit CSS files in `src/components/`
- **Add quick actions**: Update quickActions array in chatbotData.ts

## 🎓 URCET Information Covered

- **General**: About URCET, vision, mission, contact information
- **Leadership**: Principal, chairman, management team
- **Academics**: All departments (CSE, AI/ML, ECE, EEE, IT, Mechanical, Civil)
- **Facilities**: Infrastructure, labs, library, transportation
- **Placements**: Training & placement cell, company visits, records

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **AI Integration**: Google Gemini AI (gemini-2.5-flash)
- **Styling**: CSS3 with modern features
- **Icons**: Lucide React
- **HTTP Client**: Axios (for future API calls)

## 📱 Mobile Responsive

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🔒 Security

- API keys are stored in environment variables
- Client-side validation for user inputs
- Error handling for API failures
- No sensitive data exposure

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Manual Deployment
```bash
npm run build
# Copy dist/ folder contents to your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, please contact the URCET IT department or create an issue in this repository.

---

**Made with ❤️ for URCET Students and Staff**
