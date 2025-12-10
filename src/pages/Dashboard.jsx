import React from "react";
import { getCurrentUser } from "../services/auth";

export default function Dashboard() {
    const user = getCurrentUser();

    return (
        <div style={{ padding: 20 }}>
            <h2>Dashboard</h2>
            <p>Welcome <strong>{user?.email || "Guest"}</strong>!</p>

            <ul>
                <li><a href="/profile">Edit Profile</a></li>
                <li><a href="/recommendations">Get Outfit Recommendations</a></li>
            </ul>
        </div>
    );
}
