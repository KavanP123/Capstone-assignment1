import React from "react";
import { useEffect, useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) setPage("users");
  }, [token]);

  function handleLogin(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  }

  return (
    <div className="container">
      <nav className="nav">
        {!token && (
          <>
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("register")}>Register</button>
          </>
        )}
        {token && <button onClick={logout}>Logout</button>}
      </nav>

      {page === "login" && !token && <Login onLogin={handleLogin} />}
      {page === "register" && !token && <Register />}
      {page === "users" && token && <Users token={token} />}
    </div>
  );
}
