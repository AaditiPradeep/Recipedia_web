import React, { useState } from "react";
import "../src/login.css";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password })
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(result.user));
        window.location.href = "home.html";
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="login-container">
      <h1>Signup</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Username"
          required
          pattern="^[a-zA-Z0-9_]+$"
          title="Username can only contain letters, numbers, and underscores."
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          required
          minLength="6"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&]).{6,}$"
          title="Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
        />
        <button type="submit">Signup</button>
      </form>
      <p>OR</p>

      <a href="/" className="link">
        Go to Login Page
      </a>
    </div>
  );
}

export default Signup;
