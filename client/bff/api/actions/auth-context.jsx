// src/contexts/auth-context.js
import { createContext } from 'react'
import { AUTH_STORAGE_KEY } from '../../../constants/constants'

export const AuthContext = createContext()

export const authInitialState = () => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    return storedUser ? JSON.parse(storedUser) : null
}

export const authActions = {
    login: (userData) => {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData))
    },
    logout: () => {
        localStorage.removeItem(AUTH_STORAGE_KEY)
    },
}
