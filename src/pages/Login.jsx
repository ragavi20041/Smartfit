// src/pages/Login.jsx
import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            const user = await login(email.trim(), password);
            if (onLogin) onLogin(user);
            // redirect to dashboard after successful login
            navigate("/dashboard");
        } catch (error) {
            setErr(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            <div className="form-card" style={{ width: 420 }}>
                <h2 style={{ marginTop: 0 }}>Sign in to SmartFit</h2>

                <form onSubmit={handleSubmit}>
                    <label style={{ fontWeight: 600 }}>Email</label>
                    <input
                        className="input"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                    />

                    <label style={{ fontWeight: 600 }}>Password</label>
                    <input
                        className="input"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                    />

                    {err && <p style={{ color: "crimson" }}>{err}</p>}

                    <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                        <button
                            type="submit"
                            className="primary-btn"
                            style={{ flex: 1, opacity: loading ? 0.7 : 1 }}
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                        <button
                            type="button"
                            className="primary-btn"
                            style={{
                                background: "transparent",
                                color: "var(--primary)",
                                border: "1px solid rgba(195,142,200,0.25)",
                                padding: "10px 12px"
                            }}
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p style={{ marginTop: 12, color: "rgba(44,37,40,0.7)" }}>
                    Don't have an account?{" "}
                    <a href="/register" style={{ color: "var(--primary)", textDecoration: "none" }}>
                        Create one
                    </a>
                </p>
            </div>
        </div>
    );
}
