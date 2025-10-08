import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  phone?: string
  loyaltyPoints: number
  role: 'customer' | 'admin' // ✅ ajouté pour gérer les rôles
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<User | null> // ✅ retourne User
  register: (email: string, password: string, name: string, phone?: string) => Promise<User | null> // ✅ idem
  logout: () => void
  loading: boolean
  updateProfile: (name: string, phone?: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

const API_BASE_URL = 'http://localhost:4000/api'

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const savedUser = localStorage.getItem('sdcreme_user')

      if (token && savedUser) {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('sdcreme_user')
        }
      }
    } catch (error) {
      console.error('Erreur vérification auth status:', error)
      const savedUser = localStorage.getItem('sdcreme_user')
      if (savedUser) setUser(JSON.parse(savedUser))
    } finally {
      setLoading(false)
    }
  }

  // ✅ Connexion
  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok && data.user) {
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('sdcreme_user', JSON.stringify(data.user))
        setUser(data.user)
        return data.user // ✅ retourne l’utilisateur
      } else {
        alert(data.error || 'Erreur lors de la connexion')
        return null
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      alert('Erreur de connexion au serveur.')
      return null
    } finally {
      setLoading(false)
    }
  }

  // ✅ Inscription
  const register = async (
      email: string,
      password: string,
      name: string,
      phone?: string
  ): Promise<User | null> => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, phone })
      })

      const data = await response.json()

      if (response.ok && data.user) {
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('sdcreme_user', JSON.stringify(data.user))
        setUser(data.user)
        return data.user // ✅ retourne l’utilisateur
      } else {
        alert(data.error || 'Erreur lors de la création du compte')
        return null
      }
    } catch (error) {
      console.error('Erreur inscription:', error)
      alert('Erreur de connexion au serveur.')
      return null
    } finally {
      setLoading(false)
    }
  }

  // ✅ Mise à jour profil
  const updateProfile = async (name: string, phone?: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        alert('Vous devez être connecté pour modifier votre profil')
        return false
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, phone })
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('sdcreme_user', JSON.stringify(data.user))
        setUser(data.user)
        return true
      } else {
        alert(data.error || 'Erreur mise à jour profil')
        return false
      }
    } catch (error) {
      console.error('Erreur profil:', error)
      alert('Erreur de connexion au serveur')
      return false
    }
  }

  // ✅ Déconnexion
  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('sdcreme_user')
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    updateProfile
  }

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  )
}
