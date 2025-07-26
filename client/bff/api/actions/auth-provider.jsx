import { useState } from 'react'
import { AuthContext, authInitialState, authActions } from './auth-context'

// 📌 Импорт функции, отправляющей POST-запрос на регистрацию
import { registerUser } from './register-user'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(authInitialState)

    const login = (userData) => {
        authActions.login(userData)
        setUser(userData)
    }

    const logout = () => {
        authActions.logout()
        setUser(null)
    }

    const register = async (login, password) => {
        try {
            const data = await registerUser(login, password)
            login(data) // сразу логиним после регистрации
        } catch (error) {
            console.error('Ошибка регистрации:', error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}
