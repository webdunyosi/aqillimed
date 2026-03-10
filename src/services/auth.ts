// Auth Service — demo authentication (frontend-only, Option A)
//
// Seed users are read from data/*.json (imported statically at build time.
// Newly registered users are stored in localStorage (since this is a
// frontend-only Vite app with no server, we cannot write to disk).
// On login, both seed JSON and localStorage-registered users are checked.
//
// ⚠️  DEMO ONLY — passwords are stored and compared as plaintext.
//    Never use plaintext passwords in a production system.
//    In production, use a proper backend with password hashing (e.g. bcrypt).

import adminsData from '../../data/admins.json'
import doctorsData from '../../data/doctors.json'
import usersData from '../../data/users.json'

export type AuthRole = 'admin' | 'doctor' | 'user'

export type AuthUser = {
  id: string | number
  fullName: string
  username: string
  password: string
  role: AuthRole
}

export type SessionUser = {
  id: string | number
  fullName: string
  username: string
  role: AuthRole
}

const SESSION_KEY = 'aqillimed_session'
const REGISTERED_USERS_KEY = 'aqillimed_registered_users'

const seedUsers: AuthUser[] = [
  ...(adminsData as AuthUser[]),
  ...(doctorsData as AuthUser[]),
  ...(usersData as AuthUser[]),
]

function getRegisteredUsers(): AuthUser[] {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY)
    return raw ? (JSON.parse(raw) as AuthUser[]) : []
  } catch {
    return []
  }
}

function getAllUsers(): AuthUser[] {
  return [...seedUsers, ...getRegisteredUsers()]
}

export function login(username: string, password: string): SessionUser | null {
  const user = getAllUsers().find(
    (u) => u.username === username && u.password === password,
  )
  if (!user) return null

  const session: SessionUser = {
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    role: user.role,
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function register(
  fullName: string,
  username: string,
  password: string,
): { success: boolean; error?: string } {
  const existing = getAllUsers().find((u) => u.username === username)
  if (existing) {
    return { success: false, error: "Bu username allaqachon mavjud" }
  }

  const newUser: AuthUser = {
    id: `reg-${Date.now()}`,
    fullName,
    username,
    password,
    role: 'user',
  }

  const registered = getRegisteredUsers()
  registered.push(newUser)
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registered))

  return { success: true }
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function getCurrentUser(): SessionUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as SessionUser) : null
  } catch {
    return null
  }
}
