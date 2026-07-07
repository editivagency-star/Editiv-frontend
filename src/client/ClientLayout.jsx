import { useEffect, useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { FiGrid, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useClientAuth } from "../context/ClientAuthContext";
import "../styles/clientLayout.css";

const navItems = [
  { to: "/client/dashboard", icon: FiGrid, label: "Dashboard" },
];

export default function ClientLayout({ children }) {
  const { isClientAuthenticated, clientUser, clientLogout, loading } = useClientAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isClientAuthenticated) {
      navigate("/client/login", { replace: true });
    }
  }, [loading, isClientAuthenticated, navigate]);

  const handleLogout = () => {
    clientLogout();
    navigate("/client/login");
  };

  const close = () => setSidebarOpen(false);

  if (loading) {
    return (
      <div className="cp-loading-screen">
        <span className="cp-loading-spinner" />
      </div>
    );
  }

  if (!isClientAuthenticated) return null;

  const displayName = clientUser?.companyName || clientUser?.name || "Client";
  const clientName = clientUser?.name || displayName;

  return (
    <div className="cp-shell">
      {/* Mobile top bar */}
      <div className="cp-mobile-bar">
        <img src="/Editiv.png" alt="EditIV" className="cp-mobile-logo" />
        <button className="cp-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <FiMenu />
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="cp-overlay" onClick={close} />}

      {/* Sidebar */}
      <aside className={`cp-sidebar ${sidebarOpen ? "cp-sidebar-open" : ""}`}>
        <button className="cp-close-btn" onClick={close} aria-label="Close menu">
          <FiX />
        </button>

        <div className="cp-sb-brand">
          <img src="/Editiv.png" alt="EditIV" className="cp-sb-logo" />
          <span className="cp-sb-tag">Client</span>
        </div>

        <nav className="cp-sb-nav">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className={({ isActive }) => `cp-sb-link ${isActive ? "cp-sb-active" : ""}`}
            >
              <Icon className="cp-sb-icon" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="cp-sb-logout" onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main content area */}
      <div className="cp-main">
        {/* Top header */}
        <header className="cp-header">
          <div className="cp-header-left">
            <h1 className="cp-header-title">Client Portal</h1>
          </div>
          <div className="cp-header-right">
            <div className="cp-header-user">
              <div className="cp-avatar">{clientName.charAt(0).toUpperCase()}</div>
              <span className="cp-username">{clientName}</span>
            </div>
            <button className="cp-header-logout" onClick={handleLogout}>
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <div className="cp-content">
          {children}
        </div>
      </div>
    </div>
  );
}
