const API_URL = import.meta.env.VITE_API_URL

export const registerUser = async (login, password) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Ошибка регистрации')
    }

    return data
}
