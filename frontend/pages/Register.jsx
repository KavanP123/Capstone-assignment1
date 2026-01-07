import { useState } from "react";
import { api } from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    birthday: ""
  });

  const [message, setMessage] = useState("");

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function submit(e) {
    e.preventDefault();
    setMessage("");

    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(form)
      });
      setMessage("Account created. You can now log in.");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Register</h2>

      <input placeholder="Username" onChange={e => update("username", e.target.value)} />
      <input placeholder="First Name" onChange={e => update("firstName", e.target.value)} />
      <input placeholder="Last Name" onChange={e => update("lastName", e.target.value)} />
      <input type="date" onChange={e => update("birthday", e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => update("password", e.target.value)} />
      <input type="password" placeholder="Confirm Password" onChange={e => update("confirmPassword", e.target.value)} />

      {message && <p>{message}</p>}

      <button>Create Account</button>
    </form>
  );
}
