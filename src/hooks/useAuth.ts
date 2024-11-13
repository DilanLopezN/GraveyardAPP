import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// Hook personalizado para usar o AuthContext
export const useAuth = () => useContext(AuthContext)
