import { useState } from "react";
import "./GenerateSave.css"

function GenerateSave() {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [site, setSite] = useState("");
  const [leakStatus, setLeakStatus] = useState(null);
  const owner = localStorage.getItem("owner");

  const generatePassword = async () => {
    const response = await fetch("/api/generate-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ length, use_upper: useUpper, use_numbers: useNumbers, use_symbols: useSymbols }),
    });
    const data = await response.json();
    setPassword(data.password);

    const leakRes = await fetch("/api/check-leak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: data.password }),
    });
    const leakData = await leakRes.json();
    if (leakData.leaked) setLeakStatus("❌ Warning: Password has been leaked before!");
    else setLeakStatus("✅ Password is safe!");
};

  const savePassword = async () => {
    if (!username || !password) {
      alert("Enter username and generate password first");
      return;
    }
    const response = await fetch("http://localhost:5000/api/save-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site, username, password, owner }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="gen-save">
      <h1 className="gen-save-heading">Password Generator & Save</h1>

      <div className="gen-save-site">
        <label>
          Site:
          <input
            className="gen-save-site-txt"
            type="text"
            value={site}
            onChange={(e) => setSite(e.target.value)} // 👈 update site
          />
        </label>
      </div>

      <div className="gen-save-username">
        <label >
          Username: 
          <input className="gen-save-username-txt" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
      </div>

      <div className="gen-save-length">
        <label>
          Length:
          <input className="gen-save-length-txt" type="number" min="1" max="64" value={length} onChange={e => setLength(Number(e.target.value))} />
        </label>
      </div>

      <div className="gen-save-checkbox">
        <label className="gen-save-checkbox-txt checkbox1">
          <input type="checkbox" checked={useUpper} onChange={() => setUseUpper(!useUpper)} />
          Use Uppercase
        </label>
        <label className="gen-save-checkbox-txt checkbox2">
          <input type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} />
          Use Numbers
        </label>
        <label className="gen-save-checkbox-txt checkbox3">
          <input type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} />
          Use Symbols
        </label>
      </div>

      <button className="gen-save-bt1" onClick={generatePassword}>Generate Password</button>
      <button className="gen-save-bt2" onClick={savePassword}>Save Password</button>

      {password && (
      <div className="gen-save-output">
        <strong>Generated Password:</strong> {password}
        {leakStatus && <div className={`leak-status ${leakStatus.includes("❌") ? "leaked" : "safe"}`}>{leakStatus}</div>}
      </div>
      )}
    </div>
  );
}

export default GenerateSave;
