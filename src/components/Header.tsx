import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="left-edge-section">
          <div className="logo">
            <img 
              src="/urcet-logo.png" 
              alt="USHA RAMA College Logo" 
              className="logo-image"
            />
          </div>
        </div>
        
        <div className="center-section">
          <h1 className="college-title">
            <a 
              href="https://usharama.edu.in/home" 
              target="_blank" 
              rel="noopener noreferrer"
              className="college-link"
            >
              <span className="college-name-highlight">USHA RAMA COLLEGE OF ENGINEERING AND TECHNOLOGY</span>
            </a>
          </h1>
          <p className="campus-subtitle">Campus Assistant</p>
        </div>
        
        <div className="right-section">
          <div className="accreditation-logos">
            <img 
              src="/naac-logo.png" 
              alt="NAAC A Grade Accredited" 
              className="accreditation-image"
            />
            <img 
              src="/affiliated.png" 
              alt="JNTUK Affiliated" 
              className="accreditation-image"
            />
            <img 
              src="/aicte.png" 
              alt="AICTE Approved" 
              className="accreditation-image"
            />
            <img 
              src="/iso-21001-2018.png" 
              alt="ISO 21001:2018 Certified" 
              className="accreditation-image"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
