import { useState } from "react";
import "./Delete.css";

function Delete() {
  const [username, setUsername] = useState("");

  const deletePassword = async () => {
    const response = await fetch(`/api/delete-password/${username}`, {
      method: "DELETE",
    });
    const data = await response.json();
    alert(data.message || data.error);
  };

  return (
    <div className="delete">
      <h2>Delete Password</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <button onClick={deletePassword}>Delete</button>
    </div>
  );
}

export default Delete;
