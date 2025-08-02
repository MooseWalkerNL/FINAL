import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function EditTruckPage() {
    const { id } = useParams()
    const [truck, setTruck] = useState(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/trucks`).then((res) => {
            const found = res.data.find((t) => t._id === id)
            if (found) setTruck(found)
            else navigate('/404')
        })
    }, [id])

    const handleChange = (e) => {
        setTruck({ ...truck, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/trucks/${id}`,
                truck,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            navigate('/')
        } catch (err) {
            if (err.response?.status === 403) {
                navigate('/403')
            } else {
                setError('Ошибка при обновлении')
            }
        }
    }

    if (!truck) return <div>Загрузка...</div>

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Редактировать грузовик</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    value={truck.name}
                    onChange={handleChange}
                    className="block w-full"
                />
                <input
                    name="type"
                    value={truck.type}
                    onChange={handleChange}
                    className="block w-full"
                />
                <input
                    name="price"
                    value={truck.price}
                    onChange={handleChange}
                    className="block w-full"
                />
                <input
                    name="description"
                    value={truck.description}
                    onChange={handleChange}
                    className="block w-full"
                />
                <input
                    name="image"
                    value={truck.image}
                    onChange={handleChange}
                    className="block w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2"
                >
                    Сохранить
                </button>
            </form>
        </div>
    )
}
