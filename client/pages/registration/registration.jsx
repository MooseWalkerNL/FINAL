import styled from 'styled-components'
import { H2 } from '../../components/H2'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const RegisterContainer = ({ className }) => {
    const navigate = useNavigate()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        if (password !== confirmPassword) {
            setError('Пароли не совпадают')
            return
        }

        if (!login || !password) {
            setError('Все поля обязательны')
            return
        }

        try {
            const response = await fetch(
                'http://localhost:5000/api/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ login, password }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Ошибка регистрации')
                return
            }

            setSuccess(true)
            setTimeout(() => navigate('/'), 2000)
        } catch (err) {
            setError('Ошибка сервера')
            console.error(err)
        }
    }

    return (
        <div className={className}>
            <H2>Регистрация</H2>
            {success && (
                <div className="success-message">Регистрация успешна!</div>
            )}
            {error && <div className="error-message">{error}</div>}
            <form className="authorisation" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Повторите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    )
}

export const Register = styled(RegisterContainer)`
    display: flex;
    margin-top: 100px;
    flex-direction: column;

    & .authorisation {
        display: flex;
        margin: 0 auto;
        flex-direction: column;
        width: 350px;
    }

    & input {
        height: 30px;
        margin: 10px;
        padding: 5px;
        font-size: 16px;
    }

    & button {
        margin: 20px;
        height: 35px;
        background: #05386b;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 16px;

        &:hover {
            background: #042a56;
        }
    }

    .error-message {
        color: red;
        text-align: center;
        margin: 10px 0;
    }

    .success-message {
        color: green;
        text-align: center;
        margin: 10px 0;
    }
`
