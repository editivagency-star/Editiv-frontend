import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import API from "../config/api";
import { useClientAuth } from "../context/ClientAuthContext";
import "../styles/clientLogin.css";

export default function ClientLogin() {
  const { clientLogin } = useClientAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/client/login`, { email, password });
      clientLogin(res.data.token);
      navigate("/client/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cl-wrapper">
      {/* Background orbs */}
      <div className="cl-orb cl-orb-1" />
      <div className="cl-orb cl-orb-2" />
      <div className="cl-orb cl-orb-3" />

      <div className="cl-card">
        {/* Brand */}
        <div className="cl-brand">
          <img src="/Editiv.png" alt="EditIV" className="cl-logo" />
          <span className="cl-portal-badge">Client Portal</span>
        </div>

        <h2 className="cl-title">Welcome back</h2>
        <p className="cl-subtitle">Sign in to view your projects & updates</p>

        {error && (
          <div className="cl-error" role="alert">
            <span>⚠ {error}</span>
          </div>
        )}

        <form className="cl-form" onSubmit={handleLogin} noValidate>
          <div className="cl-field">
            <FiMail className="cl-field-icon" />
            <input
              id="client-email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="cl-field">
            <FiLock className="cl-field-icon" />
            <input
              id="client-password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="cl-eye-btn"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button id="client-signin-btn" type="submit" className="cl-btn" disabled={loading}>
            {loading ? <span className="cl-spinner" /> : <><FiLogIn /> Sign In</>}
          </button>
        </form>

        <p className="cl-footer">EditIV © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
