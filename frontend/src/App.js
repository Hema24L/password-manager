import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
import GenerateSave from "./pages/GenerateSave.js";
import Retrieve from "./pages/Retrieve.js";
import Update from "./pages/Update.js";
import Delete from "./pages/Delete.js";
import Seepasswords from "./pages/Seepasswords.js";
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const savedOwner = localStorage.getItem("owner");
    if (savedOwner) {
      setIsLoggedIn(true);
      setOwner(savedOwner);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("owner");
    setIsLoggedIn(false);
    setOwner(null);
  };

  return (
    <Router>
      <div className="Nav-bar-app">
        <h1 className="Nav-bar-app-heading"><strong>Password Manager</strong></h1>

        {/* NavBar */}
        <nav className="Nav-bar-app-elem">
          {!isLoggedIn ? (
            <>
              <Link className="nav-bar-signup" to="/signup">Signup</Link> |{" "}
              <Link className="nav-bar-login" to="/login">Login</Link>
            </>
          ) : (
            <>
              {/* ✅ CRUD links only appear after login */}
              <Link className="nav-bar-gensave" to="/save">Generate & Save Password</Link> |{" "}
              <Link className="nav-bar-ret" to="/retrieve">Retrieve Password</Link> |{" "}
              <Link className="nav-bar-upd" to="/update">Update Password</Link> |{" "}
              <Link className="nav-bar-del" to="/delete">Delete Password</Link> |{" "}
              <Link className="nav-bar-see" to="/see">See Saved Passwords</Link> |{" "}
              <button className="logout-bt" onClick={handleLogout} style={{ marginLeft: 10 }}>Logout</button>
            </>
          )}
        </nav>
        
        <hr/>

        {/* Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setOwner={setOwner} />} />

          {/* Protected Routes */}
          {isLoggedIn ? (
            <>
              <Route path="/save" element={<GenerateSave owner={owner} />} />
              <Route path="/retrieve" element={<Retrieve owner={owner} />} />
              <Route path="/update" element={<Update owner={owner} />} />
              <Route path="/delete" element={<Delete owner={owner} />} />
              <Route path="/see" element={<Seepasswords owner={owner} />} />
            </>
          ) : (
            <>
              {/* Redirect if not logged in */}
              <Route path="/save" element={<Navigate to="/login" />} />
              <Route path="/retrieve" element={<Navigate to="/login" />} />
              <Route path="/update" element={<Navigate to="/login" />} />
              <Route path="/delete" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
