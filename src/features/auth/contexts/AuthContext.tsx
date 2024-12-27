import { createContext, useContext } from 'react'
import { useAuth } from '../hooks/useAuth'
import { AuthContextType } from '../types/AuthTypes'

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth()

  if (auth.isInitializing) {
    return null
  }

  return (
    <AuthContext.Provider value={{
      ...auth,
      user: auth.currentUser,
      isLoading: auth.isLoading,
      isAuthenticated: auth.isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}