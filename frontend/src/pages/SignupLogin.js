import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignupLogin.css";

export default function SignupLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (forgotPassword) {
      alert("Password reset link sent to your email!");
      return;
    }

    try {
      if (isLogin) {
        // For now, just simulate login (we’ll add backend later)
        alert("Login successful!");
        navigate("/");
      } else {
        // Signup request to backend
        const response = await axios.post("http://localhost:5000/signup", {
          email,
          password,
        });

        alert(response.data.message || "Signup successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>
          {forgotPassword
            ? "Forgot Password"
            : isLogin
            ? "Login"
            : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {!forgotPassword && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          <button type="submit" className="auth-btn">
            {forgotPassword
              ? "Send Reset Link"
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        <div className="auth-links">
          {!forgotPassword && (
            <p onClick={() => setForgotPassword(true)} className="link">
              Forgot Password?
            </p>
          )}

          {forgotPassword && (
            <p onClick={() => setForgotPassword(false)} className="link">
              Back to Login
            </p>
          )}

          {!forgotPassword && (
            <p>
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
              <span className="link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
