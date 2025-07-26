export const getUser = async (id) => {
    const response = await fetch(`http://localhost:5000/api/users/${id}`)
    if (!response.ok) {
        throw new Error('Ошибка при получении пользователя')
    }
    return await response.json()
}
