import { useState } from "react";
import "./Update.css";

function Update() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePassword = async () => {
    const response = await fetch("/api/update-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password: newPassword }),
    });
    const data = await response.json();
    alert(data.message || data.error);
  };

  return (
    <div className="update">
      <h2>Update Password</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="text" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      <button onClick={updatePassword}>Update</button>
    </div>
  );
}

export default Update;
