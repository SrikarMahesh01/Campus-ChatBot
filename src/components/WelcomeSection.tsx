import { MessageCircle, Book, Calendar, Building, MapPin, Zap, Users, Clock } from 'lucide-react';
import './WelcomeSection.css';

export function WelcomeSection() {
  const features = [
    {
      icon: <Book size={20} />,
      title: "Academic Info",
      description: "Course details, schedules & exams",
      color: "blue"
    },
    {
      icon: <Calendar size={20} />,
      title: "Campus Events",
      description: "Tech fests & cultural activities",
      color: "green"
    },
    {
      icon: <Building size={20} />,
      title: "Departments",
      description: "Engineering specializations",
      color: "purple"
    },
    {
      icon: <MapPin size={20} />,
      title: "Facilities",
      description: "Hostels, transport & sports",
      color: "orange"
    }
  ];

  const stats = [
    { icon: <Users size={16} />, value: "5000+", label: "Students" },
    { icon: <Building size={16} />, value: "5", label: "Departments" },
    { icon: <Clock size={16} />, value: "24/7", label: "Support" }
  ];

  return (
    <section className="welcome-section">
      <div className="welcome-container">
        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Zap size={16} />
              <span>AI-Powered Campus Assistant</span>
            </div>
            <h1 className="hero-title">
              Your Smart Guide to
              <span className="gradient-text"> URCET Campus</span>
            </h1>
            <p className="hero-description">
              Get instant answers about academics, events, facilities, and campus life. 
              Our intelligent assistant is here to help students and staff 24/7.
            </p>
            
            {/* Stats */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hero-cta">
              <div className="chat-prompt">
                <MessageCircle size={18} />
                <span>Start chatting now →</span>
              </div>
              <p className="chat-hint">Click the chat icon in the bottom-right corner</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-section">
          <h2 className="features-title">What can I help you with?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card ${feature.color}`}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
