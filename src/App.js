import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";

import JobDetail from "./JobDetail";
import Login from "./Login";
import Register from "./Register";
import SearchResults from "./SearchResults";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");
  const userPhoto = localStorage.getItem("userPhoto");

  return (
    <Router>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          background: "#f5f5f5",
        }}
      >
        <Link to="/">Home</Link>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
