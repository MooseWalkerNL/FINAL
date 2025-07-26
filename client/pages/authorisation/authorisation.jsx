import styled from 'styled-components'
import { H2 } from '../../components/H2'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../hooks/use-auth'

const API_URL = import.meta.env.VITE_API_URL

const authFormSchema = yup.object().shape({
    login: yup
        .string()
        .required('Заполните логин')
        .matches(
            /^\w+$/,
            'Неверно заполнен логин. Допускаются только буквы и цифры'
        )
        .min(3, 'Неверно заполнен логин. Минимум 3 символа')
        .max(15, 'Неверный логин. Максимум 15 символов'),
    password: yup
        .string()
        .required('Введите пароль')
        .matches(
            /^[\w#%]+$/,
            'Неверно заполнен пароль, допускаются буквы, цифры и знаки # %'
        )
        .min(6, 'Неверно заполнен пароль. Минимум 6 символов')
        .max(30, 'Неверный пароль. Максимум 30 символов'),
})

const AuthorisationContainer = ({ className }) => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const toRegistration = () => {
        navigate('/register')
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(authFormSchema),
    })

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: data.login,
                    password: data.password,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                alert(result.message || 'Ошибка входа')
                return
            }

            login(result.user)
            navigate('/')
        } catch (error) {
            console.error('Ошибка авторизации:', error)
            alert('Сервер недоступен')
        }
    }

    return (
        <div className={className}>
            <H2>Авторизация</H2>
            <form className="authorisation" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Логин" {...register('login')} />
                {errors.login && (
                    <span className="error">{errors.login.message}</span>
                )}

                <input
                    type="password"
                    placeholder="Пароль"
                    {...register('password')}
                />
                {errors.password && (
                    <span className="error">{errors.password.message}</span>
                )}

                <button type="submit">Войти</button>
            </form>
            <a className="register" onClick={toRegistration}>
                Нет аккаунта? Зарегистрироваться
            </a>
        </div>
    )
}

export const Authorisation = styled(AuthorisationContainer)`
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
    }
    & button {
        margin: 20px;
        height: 35px;
    }
    & .register {
        margin-bottom: 400px;
    }
`
