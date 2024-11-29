'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import api from '@/config/api'
import { IUser } from '@/interfaces/users'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  user: IUser | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
}

interface LoginCredentials {
  email: string
  password: string
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)
  const [redirectPath, setRedirectPath] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      validateToken(token)
    }
  }, [])

  useEffect(() => {
    if (redirectPath) {
      router.push(redirectPath)
      setRedirectPath(null)
    }
  }, [redirectPath, router])

  const validateToken = async (token: string) => {
    try {
      const decoded = jwtDecode<IUser>(token)
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        localStorage.removeItem('token')
        logout()
        setRedirectPath('/')
      } else {
        setUser(decoded)
        setIsAuthenticated(true)
        setRedirectPath(decoded.role === 'coordinator' ? '/coordinator/dashboard' : '/student/home')
      }
    } catch (error) {
      console.error(error)
      logout()
    }
  }

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await api.post('/auth/login', credentials)
      const { token } = response.data
  
      if (!token) {
        return false
      }
  
      const decodedUser = jwtDecode<IUser>(token)
      localStorage.setItem('token', token)
      setUser(decodedUser)
      setIsAuthenticated(true)
      
      const redirectPath = decodedUser.role === 'coordinator' 
        ? '/coordinator/dashboard' 
        : '/student/home'
      
      router.push(redirectPath)
      return true
    } catch (error) {
      console.log('ERRO COMPLETO NO LOGIN:', error)  // Adicione esta linha
      setIsAuthenticated(false)
      setUser(null)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}