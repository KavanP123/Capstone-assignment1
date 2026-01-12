import React from "react";
import { useEffect, useState } from "react";
import { apiAuth } from "../utils/api";

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString();
}

function formatDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleString();
}

export default function Users({ token }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    apiAuth("/users", token)
      .then((data) => setUsers(Array.isArray(data.users) ? data.users : []))
      .catch((err) => setError(err.message || "Failed to load users"));
  }, [token]);

  return (
    <div className="card">
      <h2>All Users</h2>

      {error && <p className="error">{error}</p>}

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.username} — {u.firstName} {u.lastName}
            {u.birthday ? ` — Birthday: ${formatDate(u.birthday)}` : ""}
            {u.createdAt ? ` — Created: ${formatDateTime(u.createdAt)}` : ""}
          </li>
        ))}
      </ul>

      {users.length === 0 && !error && <p>No users found.</p>}
    </div>
  );
}
