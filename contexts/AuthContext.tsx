import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  phone?: string
  loyaltyPoints: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('sdcreme_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, _password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        name: 'Client SDCREME',
        loyaltyPoints: 150
      }

      setUser(mockUser)
      localStorage.setItem('sdcreme_user', JSON.stringify(mockUser))
      return true
    } catch (error) {
      return false
    }
  }

  const register = async (email: string, _password: string, name: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock successful registration
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        loyaltyPoints: 0
      }

      setUser(newUser)
      localStorage.setItem('sdcreme_user', JSON.stringify(newUser))
      return true
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sdcreme_user')
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  )
}