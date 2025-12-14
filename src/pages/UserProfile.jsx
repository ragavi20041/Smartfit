// src/pages/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { loadProfile, saveProfile } from "../services/profileService";
import { getCurrentUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

/*
UserProfile.jsx
- Full profile form (skin tone, hair, face, body measurements already handled)
- Inline help & tutorial links to help users identify their features
- Saves to localStorage via profileService.saveProfile
- Redirects to /dashboard after save
*/

const SKIN_OPTIONS = [
  { value: "warm", label: "Warm (golden/yellow undertone)" },
  { value: "cool", label: "Cool (pink/blue undertone)" },
  { value: "neutral", label: "Neutral (mix of both)" },
];

const HAIR_OPTIONS = [
  { value: "straight", label: "Straight" },
  { value: "wavy", label: "Wavy" },
  { value: "curly", label: "Curly" },
  { value: "coily", label: "Coily" },
];

const FACE_OPTIONS = [
  { value: "oval", label: "Oval" },
  { value: "round", label: "Round" },
  { value: "square", label: "Square" },
  { value: "heart", label: "Heart" },
  { value: "diamond", label: "Diamond" },
];

const STYLE_OPTIONS = [
  { value: "elegant", label: "Elegant / Classy" },
  { value: "casual", label: "Casual / Everyday" },
  { value: "cute", label: "Cute / Aesthetic" },
  { value: "funky", label: "Funky / Bold" },
  { value: "minimal", label: "Minimal / Clean" },
];

export default function UserProfile({ user }) {
  const navigate = useNavigate();
  const existing = loadProfile();

  // Prefill from saved profile or current user
  const [email, setEmail] = useState(existing?.email || (user && user.email) || "");
  const [skinTone, setSkinTone] = useState(existing?.skinTone || "");
  const [hairType, setHairType] = useState(existing?.hairType || "");
  const [faceShape, setFaceShape] = useState(existing?.faceShape || "");
  const [bodyType, setBodyType] = useState(existing?.bodyType || existing?.bodyType || "");
  const [height, setHeight] = useState(existing?.height || "");
  const [bust, setBust] = useState(existing?.measurements?.bust || "");
  const [waist, setWaist] = useState(existing?.measurements?.waist || "");
  const [hips, setHips] = useState(existing?.measurements?.hips || "");
  const [shoulders, setShoulders] = useState(existing?.measurements?.shoulders || "");
  const [stylesPref, setStylesPref] = useState(existing?.stylesPref || []);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // If no email typed but logged-in user available
    const u = getCurrentUser();
    if (!email && u?.email) setEmail(u.email);
  }, []);

  function toggleStyle(pref) {
    setStylesPref(prev => (prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]));
  }

  function validate() {
    // Reasonable validation: require skin, hair, face and at least basic measurements
    if (!skinTone) return "Please select your skin tone (we provide video help).";
    if (!hairType) return "Please select your hair type.";
    if (!faceShape) return "Please select your face shape.";
    if (!bust || !waist || !hips) return "Please enter bust, waist and hips measurements (in cm).";
    return null;
  }

  async function handleSave(e) {
    e?.preventDefault();
    setMsg("");
    const err = validate();
    if (err) {
      setMsg(err);
      return;
    }
    setSaving(true);
    try {
      const profile = {
        email,
        skinTone,
        hairType,
        faceShape,
        bodyType,
        height,
        measurements: { bust, waist, hips, shoulders },
        stylesPref,
        updatedAt: new Date().toISOString(),
      };
      saveProfile(profile);
      setMsg("Profile saved ✓ — redirecting to Dashboard...");
      setTimeout(() => navigate("/dashboard"), 900);
    } catch (e) {
      console.error(e);
      setMsg("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <h2 style={{ margin: 0 }}>Create / Update Profile</h2>
            <div className="helper" style={{ marginTop: 8 }}>
              We’ll use this info to recommend outfits that flatter your body, tone and style.
              Not sure about any field? Use the video guides or helpful tips below.
            </div>

            <div style={{ marginTop: 12 }}>
              <strong style={{ fontSize: 13 }}>Quick links:</strong>
              <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a className="helper" href="https://www.youtube.com/results?search_query=how+to+find+skin+tone" target="_blank" rel="noreferrer">Skin tone video</a>
                <a className="helper" href="https://www.youtube.com/results?search_query=how+to+identify+hair+type" target="_blank" rel="noreferrer">Hair texture guide</a>
                <a className="helper" href="https://www.youtube.com/results?search_query=how+to+measure+bust+waist+hips" target="_blank" rel="noreferrer">How to measure</a>
                <a className="helper" href="https://www.youtube.com/results?search_query=how+to+find+face+shape" target="_blank" rel="noreferrer">Face shape tutorial</a>
              </div>
            </div>
          </div>

          <div style={{ minWidth: 160, textAlign: "right" }}>
            <div style={{ fontWeight: 700, color: "var(--primary)" }}>Profile Settings</div>
            <div style={{ fontSize: 13, color: "rgba(44,37,40,0.6)", marginTop: 8 }}>
              Save your profile to view personalized recommendations.
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="primary-btn" onClick={() => window.open("https://www.youtube.com/results?search_query=how+to+measure+bust+waist+hips", "_blank")}>Watch measuring tips</button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ marginTop: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label>Email (optional)</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
              <div className="helper">We recommend adding an email so you can recover your profile across devices later.</div>
            </div>

            <div>
              <label>Skin Tone</label>
              <select className="input" value={skinTone} onChange={e => setSkinTone(e.target.value)}>
                <option value="">Select skin tone</option>
                {SKIN_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            <div>
              <label>Hair Type</label>
              <select className="input" value={hairType} onChange={e => setHairType(e.target.value)}>
                <option value="">Select hair type</option>
                {HAIR_OPTIONS.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
              </select>
            </div>

            <div>
              <label>Face Shape</label>
              <select className="input" value={faceShape} onChange={e => setFaceShape(e.target.value)}>
                <option value="">Select face shape</option>
                {FACE_OPTIONS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>

            <div>
              <label>Body Type (optional)</label>
              <input className="input" value={bodyType} onChange={e => setBodyType(e.target.value)} placeholder="e.g. pear / hourglass (optional)" />
            </div>

            <div>
              <label>Height (cm) (optional)</label>
              <input className="input" type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 162" />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label>Bust (cm)</label>
                  <input className="input" type="number" value={bust} onChange={e => setBust(e.target.value)} placeholder="e.g. 86" />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Waist (cm)</label>
                  <input className="input" type="number" value={waist} onChange={e => setWaist(e.target.value)} placeholder="e.g. 66" />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Hips (cm)</label>
                  <input className="input" type="number" value={hips} onChange={e => setHips(e.target.value)} placeholder="e.g. 96" />
                </div>
              </div>
            </div>

            <div>
              <label>Shoulders (cm) (optional)</label>
              <input className="input" type="number" value={shoulders} onChange={e => setShoulders(e.target.value)} placeholder="e.g. 38" />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", marginBottom: 8 }}>Style preferences (pick any)</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {STYLE_OPTIONS.map(s => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => toggleStyle(s.value)}
                    className={stylesPref.includes(s.value) ? "primary-btn" : "primary-btn secondary"}
                    style={{ padding: "8px 10px", borderRadius: 10 }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10, alignItems: "center", marginTop: 6 }}>
              <button type="submit" className="primary-btn" style={{ width: 180 }} disabled={saving}>
                {saving ? "Saving..." : "Save & Continue"}
              </button>

              <button type="button" className="primary-btn secondary" onClick={() => navigate("/dashboard")}>Skip</button>

              <div style={{ marginLeft: 8, color: "rgba(44,37,40,0.7)" }}>
                {msg && <span style={{ fontWeight: 700 }}>{msg}</span>}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Profile preview on the right/below (responsive) */}
      <div style={{ marginTop: 18 }}>
        <div className="section-title">
          <div>Profile Preview</div>
          <div className="underline" />
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div className="profile-small" style={{ minWidth: 260 }}>
            <div style={{ fontWeight: 700 }}>Basics</div>
            <div className="helper" style={{ marginTop: 6 }}>Email</div>
            <div style={{ fontWeight: 700 }}>{email || "—"}</div>

            <div className="helper" style={{ marginTop: 10 }}>Style preferences</div>
            <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
              {stylesPref.length ? stylesPref.map(s => <div key={s} style={{ background: "var(--accent)", padding: "6px 10px", borderRadius: 999 }}>{s}</div>) : <div style={{ color: "rgba(44,37,40,0.6)" }}>—</div>}
            </div>
          </div>

          <div className="profile-small" style={{ minWidth: 260 }}>
            <div style={{ fontWeight: 700 }}>Appearance</div>
            <div className="helper" style={{ marginTop: 6 }}>Skin Tone</div>
            <div style={{ fontWeight: 700 }}>{skinTone || "—"}</div>
            <div className="helper" style={{ marginTop: 8 }}>Hair</div>
            <div style={{ fontWeight: 700 }}>{hairType || "—"}</div>
            <div className="helper" style={{ marginTop: 8 }}>Face Shape</div>
            <div style={{ fontWeight: 700 }}>{faceShape || "—"}</div>
          </div>

          <div className="profile-small" style={{ minWidth: 260 }}>
            <div style={{ fontWeight: 700 }}>Measurements</div>
            <div className="helper" style={{ marginTop: 6 }}>Bust / Waist / Hips</div>
            <div style={{ fontWeight: 700 }}>{bust || "—"} / {waist || "—"} / {hips || "—"} cm</div>
            <div className="helper" style={{ marginTop: 8 }}>Height</div>
            <div style={{ fontWeight: 700 }}>{height || "—"} cm</div>
          </div>
        </div>
      </div>
    </div>
  );
}
