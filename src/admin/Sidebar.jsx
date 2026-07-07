import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import {
  FiGrid,
  FiPlusCircle,
  FiFolderPlus,
  FiCalendar,
  FiLogOut,
  FiMenu,
  FiX,
  FiUsers,
  FiFolder,
  FiFileText,
} from "react-icons/fi";

const navItems = [
  { to: "/admin/dashboard", icon: FiGrid, label: "Dashboard" },
  { to: "/admin/add-portfolio", icon: FiPlusCircle, label: "Add Portfolio" },
  { to: "/admin/folders", icon: FiFolderPlus, label: "Manage Portfolio" },
  { to: "/admin/bookings", icon: FiCalendar, label: "Bookings" },
  { to: "/admin/clients", icon: FiUsers, label: "Clients" },
  { to: "/admin/projects", icon: FiFolder, label: "Projects" },
  { to: "/admin/invoices", icon: FiFileText, label: "Invoices" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const close = () => setOpen(false);

  return (
    <>
      {/* ── Mobile top bar ── */}
      <div className="sb-mobile-bar">
        <img src="/Editiv.png" alt="EditIV" className="sb-mobile-logo" />
        <button className="sb-hamburger" onClick={() => setOpen(true)} aria-label="Open menu">
          <FiMenu />
        </button>
      </div>

      {/* ── Overlay backdrop ── */}
      {open && <div className="sb-overlay" onClick={close} />}

      {/* ── Sidebar drawer ── */}
      <aside className={`sidebar ${open ? "sb-open" : ""}`}>

        {/* Close button (mobile only) */}
        <button className="sb-close-btn" onClick={close} aria-label="Close menu">
          <FiX />
        </button>

        {/* Brand */}
        <div className="sb-brand">
          <img src="/Editiv.png" alt="EditIV" className="sb-logo" />
          <span className="sb-tag">Admin</span>
        </div>

        {/* Nav */}
        <nav className="sb-nav">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className={({ isActive }) => `sb-link ${isActive ? "sb-active" : ""}`}
            >
              <Icon className="sb-icon" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button className="sb-logout" onClick={logout}>
          <FiLogOut />
          <span>Logout</span>
        </button>

      </aside>
    </>
  );
}
