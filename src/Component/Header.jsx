import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./Header.css";

function Header() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="app-header">
        <div className="container">
          <a href="/" className="app-brand">
            <h3>SmartComplaint</h3>
          </a>

          <nav className="app-nav">
            <NavLink to="/" className="nav-link" onClick={closeSidebar}>
              Home
            </NavLink>
            <NavLink to="/report" className="nav-link" onClick={closeSidebar}>
              Raise Complaint
            </NavLink>
            {localStorage.getItem("token") && (
              <NavLink
                to="/CitizenDashboard"
                className="nav-link"
                onClick={closeSidebar}
              >
                Track Complaint
              </NavLink>
            )}
            <NavLink to="/about" className="nav-link" onClick={closeSidebar}>
              About
            </NavLink>
          </nav>

          <div className="app-actions">
            <button className="btn-ghost">
              <NavLink
                to="/dashboard"
                className="nav-link"
                onClick={closeSidebar}
              >
                Dashboard
              </NavLink>
            </button>

            <button className="btn-primary">
              <NavLink to="/signup" className="nav-link" onClick={closeSidebar}>
                Sign Up
              </NavLink>
            </button>
          </div>

          <button className="hamburger" onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        onClick={closeSidebar}
      >
        <div className="sidebar-content" onClick={(e) => e.stopPropagation()}>
          <nav className="sidebar-nav">
            <NavLink to="/" className="nav-link" onClick={closeSidebar}>
              Home
            </NavLink>
            <NavLink to="/report" className="nav-link" onClick={closeSidebar}>
              Raise Complaint
            </NavLink>
            {localStorage.getItem("token") && (
              <NavLink
                to="/CitizenDashboard"
                className="nav-link"
                onClick={closeSidebar}
              >
                Track Complaint
              </NavLink>
            )}
            <NavLink to="/about" className="nav-link" onClick={closeSidebar}>
              About
            </NavLink>
          </nav>

          <div className="sidebar-actions">
            <button className="btn-ghost">
              <NavLink
                to="/dashboard"
                className="nav-link"
                onClick={closeSidebar}
              >
                Dashboard
              </NavLink>
            </button>

            <button className="btn-primary">
              <NavLink to="/signup" className="nav-link" onClick={closeSidebar}>
                Sign Up
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
