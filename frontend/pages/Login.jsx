import { useState } from "react";
import { api } from "../utils/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      });
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <button>Login</button>
    </form>
  );
}
