const API_URL = import.meta.env.VITE_API_URL

export const getUser = async (id) => {
    const response = await fetch(`${API_URL}/api/users/${id}`)
    if (!response.ok) {
        throw new Error('Ошибка при получении пользователя')
    }
    return await response.json()
}
