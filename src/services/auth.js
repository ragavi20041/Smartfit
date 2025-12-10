// src/services/auth.js

// KEY used in localStorage
const AUTH_KEY = "smartfit_user";

// Register new user
export async function register(email, password) {
  const user = { email, password };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

// Login existing user
export async function login(email, password) {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) throw new Error("No account found");

  const user = JSON.parse(stored);

  if (user.email === email && user.password === password) {
    return user;
  } else {
    throw new Error("Invalid credentials");
  }
}

// ⭐ THIS IS THE MISSING FUNCTION
export function getCurrentUser() {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  return JSON.parse(stored);
}

// Logout
export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
