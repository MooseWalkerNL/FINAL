import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditTruck = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [truck, setTruck] = useState(null)
    const [form, setForm] = useState({
        name: '',
        type: '',
        price: '',
        image_url: '',
    })

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/trucks/${id}`)
            .then((res) => {
                setTruck(res.data)
                setForm({
                    name: res.data.name,
                    type: res.data.type,
                    price: res.data.price,
                    image_url: res.data.image_url,
                })
            })
            .catch(() => navigate('/403'))
    }, [id])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/trucks/${id}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            navigate('/')
        } catch (err) {
            alert('Ошибка при обновлении')
        }
    }

    if (!truck) return <p>Загрузка...</p>

    return (
        <form onSubmit={handleSubmit}>
            <h2>Редактирование грузовика</h2>
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Название"
            />
            <input
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Тип"
            />
            <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Цена"
                type="number"
            />
            <input
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="Ссылка на изображение"
            />
            <button type="submit">Сохранить</button>
        </form>
    )
}

export default EditTruck
