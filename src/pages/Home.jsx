// src/pages/Home.jsx
import React from "react";

export default function Home() {
    return (
        <div className="container">
            <div className="hero">
                <div className="hero-left">
                    <h1 className="hero-heading">SMARTFIT</h1>
                    <p className="hero-sub">
                        AI-Powered Fashion Recommender — Get personalized outfit ideas using the power of AI.
                    </p>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button className="primary-btn">Get Started</button>
                        <button className="primary-btn" style={{ background: "transparent", color: "var(--primary)", border: "1px solid rgba(195,142,200,0.25)" }}>Try Outfit</button>
                    </div>
                </div>

                <div className="hero-right">
                    <img src="https://via.placeholder.com/260x340.png?text=Model" alt="model" style={{ borderRadius: 14 }} />
                </div>
            </div>

            <div>
                <div className="section-title">
                    <div>Recommended For You</div>
                    <div className="underline" />
                </div>

                <div className="cards-row">
                    <div className="card">
                        <img src="https://via.placeholder.com/260x160.png?text=Outfit+1" alt="o1" />
                        <div style={{ marginTop: 8 }}>
                            <div className="tag">Top Pick</div>
                            <h4 style={{ margin: "8px 0 4px 0" }}>Elegant Mauve Jacket</h4>
                            <div style={{ color: "rgba(44,37,40,0.6)", fontSize: 14 }}>Stylish blazer for smart casual looks</div>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://via.placeholder.com/260x160.png?text=Outfit+2" alt="o2" />
                        <div style={{ marginTop: 8 }}>
                            <h4 style={{ margin: "8px 0 4px 0" }}>Classic Black Dress</h4>
                            <div style={{ color: "rgba(44,37,40,0.6)", fontSize: 14 }}>Minimal evening outfit</div>
                        </div>
                    </div>

                    <div className="card">
                        <img src="https://via.placeholder.com/260x160.png?text=Outfit+3" alt="o3" />
                        <div style={{ marginTop: 8 }}>
                            <h4 style={{ margin: "8px 0 4px 0" }}>Neutral Trench Coat</h4>
                            <div style={{ color: "rgba(44,37,40,0.6)", fontSize: 14 }}>Layered look for cooler days</div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 18 }}>
                    <button className="primary-btn" style={{ background: "transparent", color: "var(--primary)", border: "1px solid rgba(195,142,200,0.25)" }}>View More</button>
                </div>
            </div>
        </div>
    );
}
