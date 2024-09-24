import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add logic for user login here
    setMessage("Login successful!");
    navigate("/homepage"); // Redirect to homepage after successful login
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Login</button>

        {message && <p className="message">{message}</p>}

        <div className="auth-links">
          <a href="/forget-password">Forgot Password?</a>
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
