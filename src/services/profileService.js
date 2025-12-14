// src/services/profileService.js

const STORAGE_KEY = "smartfit_profile";

/**
 * Save profile object to localStorage.
 * Profile shape:
 * {
 *   email: string (optional),
 *   skinTone: "warm"|"cool"|"neutral" | string,
 *   bodyType: string,
 *   height: string,
 *   hairType: string,
 *   faceShape: string,
 *   updatedAt: ISOString
 * }
 */
export function saveProfile(profile) {
  if (!profile || typeof profile !== "object") {
    throw new Error("Invalid profile");
  }
  const existing = loadProfile() || {};
  const merged = {
    ...existing,
    ...profile,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load profile", e);
    return null;
  }
}

export function clearProfile() {
  localStorage.removeItem(STORAGE_KEY);
}
