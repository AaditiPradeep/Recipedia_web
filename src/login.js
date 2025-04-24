import React, { useState } from "react";
import "./login.css";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/login", {
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
                alert(result.message || "Login failed");
            }
        } catch (err) {
            alert("Something went wrong. Please try again.");
            console.error(err);
        }
    }

    return (
        <div className="login-container">
            <h1>Login</h1>

            <form onSubmit={submit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Username"
                    required
                    pattern="^[a-zA-Z0-9_]+$"
                    title="Username can only contain letters, numbers, and underscores."
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    minLength="6"
                />

                <button type="submit">Login</button>
            </form>

            <p>OR</p>
            <a href="/signup" className="link">Go to Signup Page</a>
        </div>
    );
}

export default Login;