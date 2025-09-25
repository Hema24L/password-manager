import React, { useState } from "react";
import "./Signup.css"

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="signup">
      <h1 className="signup-heading">Sign up</h1>
      <input
        className="signup-username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        className="signup-password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="signup-bt" onClick={handleSignup}>Signup</button>
      <p>{message}</p>
    </div>
  );
}

export default Signup;
