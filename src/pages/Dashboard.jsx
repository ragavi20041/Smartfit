// src/pages/Dashboard.jsx
import React from "react";
import { loadProfile } from "../services/profileService";
import { Link } from "react-router-dom";

export default function Dashboard({ user }) {
    const profile = loadProfile();

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h2 style={{ margin: 0 }}>Dashboard</h2>
                    <div className="helper" style={{ marginTop: 6 }}>
                        Welcome {user?.email ? user.email : "Guest"} — your SmartFit dashboard.
                    </div>
                </div>

                <div>
                    <Link to="/profile" className="primary-btn" style={{ background: "transparent", color: "var(--primary)", border: "1px solid rgba(195,142,200,0.25)", padding: "10px 12px" }}>
                        Edit Profile
                    </Link>
                </div>
            </div>

            <div style={{ marginTop: 20 }}>
                <div className="section-title">Your Profile Summary <div className="underline" /></div>

                {!profile ? (
                    <div style={{ marginTop: 12 }}>
                        <p>You haven't completed your profile yet. <Link to="/profile" style={{ color: "var(--primary)" }}>Fill it now</Link></p>
                    </div>
                ) : (
                    <div style={{ marginTop: 12, display: "flex", gap: 20, flexWrap: "wrap" }}>
                        <div style={{ minWidth: 260, background: "var(--card)", padding: 16, borderRadius: 12, boxShadow: "var(--shadow)" }}>
                            <h4 style={{ margin: "0 0 8px 0" }}>Basic</h4>
                            <div className="helper">Email</div>
                            <div style={{ fontWeight: 600 }}>{profile.email || "—"}</div>

                            <div className="helper" style={{ marginTop: 10 }}>Saved</div>
                            <div style={{ fontSize: 13, color: "rgba(44,37,40,0.6)" }}>{profile.updatedAt ? new Date(profile.updatedAt).toLocaleString() : "—"}</div>
                        </div>

                        <div style={{ minWidth: 260, background: "var(--card)", padding: 16, borderRadius: 12, boxShadow: "var(--shadow)" }}>
                            <h4 style={{ margin: "0 0 8px 0" }}>Body & Face</h4>
                            <div className="helper">Body Type</div>
                            <div style={{ fontWeight: 600 }}>{profile.bodyType || "—"}</div>
                            <div className="helper" style={{ marginTop: 8 }}>Face Shape</div>
                            <div style={{ fontWeight: 600 }}>{profile.faceShape || "—"}</div>
                        </div>

                        <div style={{ minWidth: 260, background: "var(--card)", padding: 16, borderRadius: 12, boxShadow: "var(--shadow)" }}>
                            <h4 style={{ margin: "0 0 8px 0" }}>Skin & Hair</h4>
                            <div className="helper">Skin Tone</div>
                            <div style={{ fontWeight: 600 }}>{profile.skinTone || "—"}</div>
                            <div className="helper" style={{ marginTop: 8 }}>Hair Type</div>
                            <div style={{ fontWeight: 600 }}>{profile.hairType || "—"}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
