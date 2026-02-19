'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há token armazenado
    const token = localStorage.getItem('auth_token')
    if (token) {
      // Validar token e obter dados do usuário
      // Por enquanto, simulando
      setUser({
        id: '1',
        email: 'usuario@exemplo.com',
        name: 'Usuário Exemplo'
      })
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Implementar login com Cognito
    // Por enquanto, simulando
    const mockUser = {
      id: '1',
      email,
      name: 'Usuário Exemplo'
    }
    setUser(mockUser)
    localStorage.setItem('auth_token', 'mock_token')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}