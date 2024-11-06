export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL?: string | null
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  currentUser: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  googleSignIn: () => Promise<void>
}
