import React from "react";
import { Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>SmartFit</h1>

      <Routes>
        <Route path="/" element={<div>Welcome to SmartFit</div>} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
