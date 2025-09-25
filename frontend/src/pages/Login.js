import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login({ setIsLoggedIn, setOwner }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("owner", data.owner);
        setIsLoggedIn(true);
        setOwner(data.owner);
        navigate("/save"); // redirect to Generate & Save Password page
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage("⚠️ Server error");
    }
  };

  return (
    <div className="login">
      <h1 className="login-heading">Login</h1>
      <input
        className="login-username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        className="login-password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="login-bt" onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
