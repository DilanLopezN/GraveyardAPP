import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

// Definindo o tipo para os dados do usuário
interface User {
  email: string
  id: string
  avatar: string
}

// Definindo o tipo para o contexto
interface AuthContextData {
  user: User | null
  loading: boolean
  login: (email: string, id: string, avatar: string) => Promise<void>
  logout: () => Promise<void>
}

// Criando o contexto com o tipo definido
export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Carregar dados do usuário ao inicializar
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@user_data')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [])

  // Função para fazer login
  const login = async (email: string, id: string, avatar: string) => {
    const userData: User = { email, id, avatar }
    setUser(userData)
    await AsyncStorage.setItem('@user_data', JSON.stringify(userData))
    router.replace('/(tabs)/')
  }

  // Função para fazer logout
  const logout = async () => {
    setUser(null)
    await AsyncStorage.removeItem('@user_data')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
