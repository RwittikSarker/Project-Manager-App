import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // useHistory in v5
import "./LandingPage.css";

const LandingPage = () => {
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const history = useHistory();

  const togglePopup = (popupType) => {
    if (popupType === "about") {
      setShowAboutPopup(!showAboutPopup);
    } else if (popupType === "contact") {
      setShowContactPopup(!showContactPopup);
    }
  };

  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="navbar-title">ProjectPlus</div>
        <nav>
          <a href="#about" onClick={() => togglePopup("about")}>
            About Us
          </a>
          <a href="#contact" onClick={() => togglePopup("contact")}>
            Contact
          </a>
        </nav>
        <div className="navbar-buttons">
          {/* Using history.push() for navigation */}
          <button onClick={() => history.push("/login")}>Login</button>
          <button className="signup-btn" onClick={() => history.push("/signup")}>
            Sign Up
          </button>
        </div>
      </header>
  
        <main className="main-content">
          <div className="main-text">
            <h1>
              Introduce Your Product <br />
              Quickly & Effectively
            </h1>
            <p>
              Welcome to ProjectPlus, your ultimate project management solution
              designed to keep teams organized, efficient, and connected. Whether
              you're tackling small tasks or managing complex workflows, our app
              streamlines collaboration, tracks progress, and ensures every
              milestone is met. With intuitive tools for scheduling,
              communication, and reporting, ProjectPlus empowers teams to focus
              on what matters most—achieving their goals. Start simplifying your
              projects today!
            </p>
            <button>Learn More</button>
          </div>
  
          <div className="illustration">
            <img src={require('./resources/illustration-placeholder.png')} alt="illustration"/>
          </div>
        </main>
        {showAboutPopup && (
          <div className="popup about-popup">
            <div className="popup-content">
              <h2>About Us</h2>
              <p>
                ProjectPlus is dedicated to streamlining project management for
                teams worldwide. We focus on collaboration and efficiency.
              </p>
              <button onClick={() => togglePopup("about")}>Close</button>
            </div>
          </div>
        )}
  
        {showContactPopup && (
          <div className="popup contact-popup">
            <div className="popup-content">
              <h2>Contact Us</h2>
              <p>Email: support@projectplus.com</p>
              <p>Phone: +880123456789</p>
              <button onClick={() => togglePopup("contact")}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default LandingPage;