import React, { useState } from "react";
import "./LeakChecker.css";

function LeakChecker() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/check-leak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checker-container">
      <h1 className="checker-title">🔒 Password Leak Checker</h1>
      <form className="checker-form" onSubmit={handleCheck}>
        <input
          type="password"
          placeholder="Enter password to check..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="checker-input"
          required
        />
        <button type="submit" className="checker-button" disabled={loading}>
          {loading ? "Checking..." : "Check Password"}
        </button>
      </form>

      {result && (
        <div
          className={`checker-result ${
            result.error
              ? "error"
              : result.found
              ? "danger"
              : "safe"
          }`}
        >
          {result.error && <p>❌ {result.error}</p>}
          {result.found && !result.error && (
            <p>
              ⚠️ This password has been leaked <b>{result.count}</b> times!
            </p>
          )}
          {!result.found && !result.error && (
            <p>✅ Good news! This password has not been leaked.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LeakChecker;
