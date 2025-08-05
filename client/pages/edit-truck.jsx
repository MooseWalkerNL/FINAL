import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditTruck = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        type: '',
        price: '',
        description: '',
        image: '',
    })
    const [error, setError] = useState('')

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/trucks/${id}`)
            .then((res) => {
                const data = res.data
                setForm({
                    name: data.name || '',
                    type: data.type || '',
                    price: data.price || '',
                    description: data.description || '',
                    image: data.image || '',
                })
            })
            .catch(() => navigate('/404'))
    }, [id, navigate])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const token = localStorage.getItem('token')
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/trucks/${id}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            navigate('/')
        } catch (err) {
            if (err.response?.status === 403) {
                navigate('/403')
            } else {
                setError('Ошибка при обновлении грузовика')
            }
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Редактирование грузовика</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Название"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    placeholder="Тип"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Цена"
                    type="number"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Описание"
                    className="w-full p-2 border rounded"
                />
                <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Ссылка на изображение"
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Сохранить
                </button>
            </form>
        </div>
    )
}

export default EditTruck
