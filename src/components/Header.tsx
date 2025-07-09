import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo">
            <div className="logo-icon">🎓</div>
            <div className="logo-text">URCET</div>
          </div>
          <div className="title-section">
            <h1 className="title">Campus Assistant</h1>
            <p className="subtitle">Usha Rama College of Engineering and Technology</p>
          </div>
        </div>
        <div className="header-actions">
          <div className="nav-items">
            <span className="nav-item">Help</span>
            <span className="nav-item">About</span>
          </div>
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">AI Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
