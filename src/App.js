import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NewMilestone from "./pages/NewMilestone";
import MilestoneDetail from "./pages/MilestoneDetail";
import About from "./pages/About";
import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h2 className="logo">Pathfolio</h2>
        <nav className="nav-links">
          <Link to="/">Timeline</Link>
          &nbsp;&nbsp;
          <Link to="/about">About</Link>
        </nav>
      </header>

      {/* Modal for Add Milestone */}
      {showModal && <NewMilestone onClose={() => setShowModal(false)} />}

      {/* Main content */}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/milestones/:id" element={<MilestoneDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}
