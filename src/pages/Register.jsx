// src/pages/Register.jsx
import React, { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErr("");

        if (password.length < 4) {
            setErr("Password must be at least 4 characters.");
            return;
        }
        if (password !== confirm) {
            setErr("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const user = await register(email.trim(), password);
            if (onRegister) onRegister(user);
            // navigate to dashboard after successful register
            navigate("/dashboard");
        } catch (error) {
            setErr(error.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            <div className="form-card" style={{ width: 520 }}>
                <h2 style={{ marginTop: 0 }}>Create your SmartFit account</h2>

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
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                    />

                    <label style={{ fontWeight: 600 }}>Confirm password</label>
                    <input
                        className="input"
                        placeholder="Repeat password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        type="password"
                    />

                    {err && <p style={{ color: "crimson" }}>{err}</p>}

                    <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                        <button
                            type="submit"
                            className="primary-btn"
                            style={{ flex: 1, opacity: loading ? 0.8 : 1 }}
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create account"}
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
                            onClick={() => navigate("/login")}
                        >
                            Have account
                        </button>
                    </div>
                </form>

                <p style={{ marginTop: 12, color: "rgba(44,37,40,0.7)" }}>
                    Already registered?{" "}
                    <a href="/login" style={{ color: "var(--primary)", textDecoration: "none" }}>
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
