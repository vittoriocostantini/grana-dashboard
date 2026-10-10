export type AuthUser = {
  email: string;
  password: string;
  name: string;
};

const USERS_STORAGE_KEY = "grana_users";
const SESSION_STORAGE_KEY = "grana_session";

export function getStoredUsers(): AuthUser[] {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  if (!usersJson) return [];

  try {
    const parsed: unknown = JSON.parse(usersJson);
    return Array.isArray(parsed) ? (parsed as AuthUser[]) : [];
  } catch {
    return [];
  }
}

export function saveStoredUsers(users: AuthUser[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function readSession(): AuthUser | null {
  const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!savedSession) return null;

  try {
    return JSON.parse(savedSession) as AuthUser;
  } catch {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
}

export function saveSession(user: AuthUser) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}
