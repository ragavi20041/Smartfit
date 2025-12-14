import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserProfile from "./pages/UserProfile.jsx";

import { getCurrentUser, logout } from "./services/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
  }, []);

  function handleLogout() {
    logout();
    setUser(null);
    navigate("/login");
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "var(--text)" }}>
      <header className="app-header">
        <div className="brand-area">
          <img
            src="/dress-icon.png"
            className="brand-logo"
            alt="logo"
          />
          <div className="brand">SMARTFIT</div>
        </div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/categories">Categories</a>
          {user ? (
            <>
              <a href="/dashboard">Dashboard</a>
              <button onClick={handleLogout} className="btn-signin">Logout</button>
            </>
          ) : (
            <a href="/login" className="btn-signin">Sign In</a>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register onRegister={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
      </Routes>
    </div>
  );
}
