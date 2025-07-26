// src/components/header.jsx
import { Logo } from './components/logo'
import styled from 'styled-components'
import { Button } from './components/button'
import { useAuth } from '../../hooks/use-auth'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const HeaderContainer = ({ className }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    // Получаем cartItems из Redux store
    const cartItems = useSelector((state) => state.cart.items || [])

    const handleAuthClick = () => {
        navigate('/login')
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className={className}>
            <div className="header">
                <Logo
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                />
                <div className="description">Магазин Грузовых Автомобилей</div>
                <div className="header-controls">
                    <div
                        className="cart-icon"
                        onClick={() => navigate('/cart')}
                    >
                        🛒
                        {cartItems.length > 0 && (
                            <span className="cart-count">
                                {cartItems.length}
                            </span>
                        )}
                    </div>
                    {user ? (
                        <Button onClick={handleLogout}>Выйти</Button>
                    ) : (
                        <Button onClick={handleAuthClick}>
                            Вход / Регистрация
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export const Header = styled(HeaderContainer)`
    display: flex;
    align-items: center;
    background-color: #05386b;
    height: 150px;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    & .header {
        display: flex;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
        color: white;
        font-size: 25px;
        padding: 0 20px;
    }

    & .description {
        font-weight: 500;
        font-family: 'Courier New', Courier, monospace;
        font-style: italic;
        font-size: 30px;
        margin: 0 20px;
    }

    .header-controls {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .cart-icon {
        position: relative;
        cursor: pointer;
        font-size: 24px;

        &:hover {
            opacity: 0.8;
        }
    }

    .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #dc3545;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
`
