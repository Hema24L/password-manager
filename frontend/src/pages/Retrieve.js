import { useState } from "react";
import "./Retrieve.css";

function Retrieve() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fetchPassword = async () => {
    try {
      const response = await fetch(`/api/get-password?username=${username}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setPassword("");
      } else {
        setPassword(data.password);
        setError("");
      }
    } catch (err) {
      setError("Error retrieving password");
    }
  };

  return (
    <div className="retrieve">
      <h2>Retrieve Password</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={fetchPassword}>Retrieve</button>

      {error && <div className="error">{error}</div>}
      {password && <div className="password-output"><strong>Password:</strong> {password}</div>}
    </div>
  );
}

export default Retrieve;
