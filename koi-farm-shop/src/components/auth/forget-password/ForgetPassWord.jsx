import React, { useState } from "react";
import "../Auth.scss";

const ForgetPassWord = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    // Add logic for password reset here
    setMessage("Password reset instructions sent to your email!");
  };

  return (
    <div className="auth-container">
      <h2>Forget Password</h2>
      <form onSubmit={handleReset}>
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

        <button type="submit">Send Reset Instructions</button>

        {message && <p className="message">{message}</p>}

        <div className="auth-links">
          <p>
            Remember your password? <a href="/login">Login here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassWord;
