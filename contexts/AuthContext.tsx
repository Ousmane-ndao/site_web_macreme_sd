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
  register: (email: string, password: string, name: string, phone?: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  updateProfile: (name: string, phone?: string) => Promise<boolean>
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

// URL de votre backend - ajustez selon votre configuration
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
        // Vérifier si le token est toujours valide
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
          // Token invalide, déconnecter l'utilisateur
          localStorage.removeItem('auth_token')
          localStorage.removeItem('sdcreme_user')
        }
      }
    } catch (error) {
      console.error('Erreur vérification auth status:', error)
      // En cas d'erreur réseau, on garde l'utilisateur connecté localement
      const savedUser = localStorage.getItem('sdcreme_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        // Stocker le token et les infos utilisateur
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('sdcreme_user', JSON.stringify(data.user))
        setUser(data.user)
        return true
      } else {
        alert(data.error || 'Erreur lors de la connexion')
        return false
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      alert('Erreur de connexion au serveur. Vérifiez votre connexion internet.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string, phone?: string): Promise<boolean> => {
    try {
      setLoading(true)

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name, phone })
      })

      const data = await response.json()

      if (data.success) {
        // Stocker le token et les infos utilisateur
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('sdcreme_user', JSON.stringify(data.user))
        setUser(data.user)
        return true
      } else {
        alert(data.error || 'Erreur lors de la création du compte')
        return false
      }
    } catch (error) {
      console.error('Erreur inscription:', error)
      alert('Erreur de connexion au serveur. Vérifiez votre connexion internet.')
      return false
    } finally {
      setLoading(false)
    }
  }

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
        // Mettre à jour l'utilisateur localement
        localStorage.setItem('sdcreme_user', JSON.stringify(data.user))
        setUser(data.user)
        return true
      } else {
        alert(data.error || 'Erreur lors de la mise à jour du profil')
        return false
      }
    } catch (error) {
      console.error('Erreur mise à jour profil:', error)
      alert('Erreur de connexion au serveur')
      return false
    }
  }

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