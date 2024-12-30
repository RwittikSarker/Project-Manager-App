import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
  const location = useLocation();
  const history = useHistory();

  // Determine the mode based on the pathname
  const isSignUp = location.pathname === "/signup";

  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    var endpoint = "";
    var payload = [];

    if (isSignUp) {
      endpoint = "http://localhost:1634/signup"
    }
    else {
      endpoint = "http://localhost:1634/login";
    }

    if (isSignUp) {
      payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      console.log(payload);
    }
    else {
      payload = {
        email: formData.email,
        password: formData.password,
      };
    };

    try {
      const req = new Request(
        endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(req);
      const response = await fetch(req);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(`${isSignUp ? "Sign up" : "Log in"} successful`, data);
        if (formData.email === "admin@example.com") {
          history.push("/adminview");
        }
        else{
          history.push("/projects", { userId: data.userId });
        }
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        alert(errorData.error );
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("this is error: " + error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div
      className="auth-page"
      style={{
        backgroundImage: `url(${require("../resources/login-signup.webp")})`,
      }}
    >
      <div className="auth-container">
        <div className="toggle-buttons">
          <button
            className={isSignUp ? "active" : ""}
            onClick={() => history.push("/signup")}
          >
            Sign up
          </button>
          <button
            className={!isSignUp ? "active" : ""}
            onClick={() => history.push("/login")}
          >
            Log in
          </button>
        </div>

        {/* Render the appropriate form based on the mode */}
        <div className="form-container">
          <h2>{isSignUp ? "Sign up" : "Log in"}</h2>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <input
                type="text"
                name="username"
                placeholder="User name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="password-container">
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {!isSignUp && (
              <a href="#" className="forgot-password">
                Forget your password
              </a>
            )}
            <button className="form-submit" type="submit">
              {isSignUp ? "Sign up" : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
