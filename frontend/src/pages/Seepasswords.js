import React, { useEffect, useState } from "react";
import "./Seepasswords.css";

function Seepasswords({ owner }) {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPasswords = async () => {
      if (!owner) {
        setError("Owner not logged in");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/passwords/owner/${owner}`);
        if (!res.ok) throw new Error("Failed to fetch passwords");
        const data = await res.json();
        setPasswords(data);
      } catch (err) {
        setError("Error retrieving passwords");
      } finally {
        setLoading(false);
      }
    };

    fetchPasswords();
  }, [owner]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="see-passwords">
      <h2>{owner}'s Saved Passwords</h2>
      {passwords.length === 0 ? (
        <p>No passwords saved yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Site</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((p, index) => (
              <tr key={index}>
                <td>{p.site}</td>
                <td>{p.username}</td>
                <td>{p.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Seepasswords;
