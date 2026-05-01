import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogInTab.module.css";

const LogInTab = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter your email address to reset password.");
      return;
    }
    // Simulate API call for sending reset link
    alert(`Password reset link sent successfully to ${email}!`);
    setIsForgotPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      if (data.name) localStorage.setItem("name", data.name);

      console.log("Login success", data);
      alert(`✅ Logged in as ${data.role}`);

      // Navigate based on role or to dashboard
      if (data.role === 'admin') navigate('/admin-dashboard');
      else if (data.role === 'authority') navigate('/authority-dashboard');
      else navigate('/CitizenDashboard');

    } catch (err) {
      alert(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#666" }}>To Report a Complaint. Please Login first..</h3>
      <div className={styles.wrapper}>
        <div className={styles.formcontainer}>
          <h2 className={styles.loginHeading}>
            {isForgotPassword ? "Reset Password" : "Log In"}
          </h2>

          {isForgotPassword ? (
            <form onSubmit={handleForgotPasswordSubmit} className={styles.minimalForm}>
              <p style={{ textAlign: "center", marginBottom: "1rem", color: "#666" }}>
                Enter your email address to receive a password reset link.
              </p>
              <div className="form-floating">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="resetEmail"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="resetEmail">Email</label>
              </div>

              <button className={styles.authButton} type="submit">
                Send Reset Link
              </button>

              <div className={styles.authHelp} style={{ marginTop: "15px", cursor: "pointer" }} onClick={() => setIsForgotPassword(false)}>
                <span className={styles.authLink}>Back to Login</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className={styles.minimalForm}>
              <div className="form-floating">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="userEmail"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="userEmail">Email</label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="userPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="userPassword">Password</label>
              </div>

              <div style={{ textAlign: "right", margin: "-10px 0 15px 0" }}>
                <span
                  className={styles.authLink}
                  style={{ fontSize: "0.9rem", cursor: "pointer" }}
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot Password?
                </span>
              </div>

              <button className={styles.authButton} type="submit">
                Login
              </button>

              <div className={styles.authHelp}>
                Don&apos;t have an account?{" "}
                <a href="/signup" className={styles.authLink}>
                  Sign Up
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default LogInTab;
