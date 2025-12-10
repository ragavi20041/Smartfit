import React, { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErr("");
        try {
            const user = await register(email.trim(), password);
            if (onRegister) onRegister(user);
            navigate("/dashboard");
        } catch (error) {
            setErr(error.message || "Registration failed");
        }
    }

    return (
        <div style={{ padding: 20, maxWidth: 420 }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br />
                <input value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />
                <label>Password</label><br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
                <button type="submit">Register</button>
            </form>
            {err && <p style={{ color: "red" }}>{err}</p>}
            <p style={{ marginTop: 12 }}><a href="/login">Login</a></p>
        </div>
    );
}
