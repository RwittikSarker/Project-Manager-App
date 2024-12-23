import React, { useState } from "react";
import "./AuthPage.css";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${require('../resources/login-signup.webp')})` }}>
      <div className="auth-container">
        {/* Toggle Buttons */}
        <div className="toggle-buttons">
          <button
            className={isSignUp ? "active" : ""}
            onClick={() => setIsSignUp(true)}
          >
            Sign up
          </button>
          <button
            className={!isSignUp ? "active" : ""}
            onClick={() => setIsSignUp(false)}
          >
            Log in
          </button>
        </div>

        {/* Sign-up or Log-in Form */}
        {isSignUp ? (
          <div className="form-container">
            <h2>Sign up</h2>
            <form>
              <div className="form-group">
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Last name" />
              </div>
              <input type="username" placeholder="User name" />
              <input type="email" placeholder="Email address" />
              <button className="form-submit">Sign up</button>
            </form>
          </div>
        ) : (
          <div className="form-container">
            <h2>Log in</h2>
            <form>
              <input type="email" placeholder="Your email" />
              <div className="password-container">
                <input type="password" placeholder="Your password" />
                <span className="toggle-password">Hide</span>
              </div>
              <a href="#" className="forgot-password">
                Forget your password
              </a>
              <button className="form-submit">Log in</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
