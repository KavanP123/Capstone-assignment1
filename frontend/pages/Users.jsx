import { useEffect, useState } from "react";
import { apiAuth } from "../utils/api";

export default function Users({ token }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiAuth("/users", token)
      .then(data => setUsers(data.users))
      .catch(console.error);
  }, [token]);

  return (
    <div className="card">
      <h2>All Users</h2>

      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.username} — {u.firstName} {u.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
