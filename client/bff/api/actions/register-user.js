export const registerUser = async (login, password) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
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
