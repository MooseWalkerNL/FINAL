import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../components/header/components/button'
import { removeFromCart, clearCart } from '../../bff/api/actions/cart-actions'
import { useAuth } from '../../hooks/use-auth'
import { useNavigate } from 'react-router-dom'

const CartContainer = ({ className }) => {
    const dispatch = useDispatch()
    const { user } = useAuth()
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.cart.items)
    const trucks = useSelector((state) => state.trucks.trucks)

    const getTruckDetails = (id) => {
        return trucks.find((truck) => truck.id === id)
    }

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id))
    }

    const handleCheckout = () => {
        if (!user) {
            navigate('/login')
            return
        }

        alert('Заказ оформлен!')
        dispatch(clearCart())
    }

    const totalPrice = cartItems.reduce((sum, item) => {
        const truck = getTruckDetails(item.id)
        if (!truck) return sum

        const rawPrice = truck.price
        const numericPrice =
            typeof rawPrice === 'string'
                ? parseFloat(rawPrice.replace(/\D/g, ''))
                : rawPrice

        return sum + (numericPrice || 0)
    }, 0)

    return (
        <div className={className}>
            <h2>Корзина</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Ваша корзина пуста</p>
                    <Button onClick={() => navigate('/')}>
                        Вернуться в каталог
                    </Button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => {
                            const truck = getTruckDetails(item.id)
                            if (!truck) return null

                            return (
                                <div key={item.id} className="cart-item">
                                    <img
                                        src={truck.image_url}
                                        alt={truck.name}
                                    />
                                    <div className="item-info">
                                        <h3>{truck.name}</h3>
                                        <p>{truck.price}</p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleRemoveItem(item.id)
                                        }
                                        className="remove-btn"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="cart-summary">
                        <h3>Итого: {totalPrice.toLocaleString('ru-RU')} ₽</h3>
                        <Button
                            onClick={handleCheckout}
                            disabled={!user}
                            title={
                                !user
                                    ? 'Для оформления заказа войдите в систему'
                                    : ''
                            }
                        >
                            Оформить заказ
                        </Button>
                        {!user && (
                            <p className="login-notice">
                                Для оформления заказа войдите в систему
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export const Cart = styled(CartContainer)`
    padding: 30px;
    max-width: 1200px;
    margin: 0 auto;

    h2 {
        color: #05386b;
        margin-bottom: 30px;
    }

    .empty-cart {
        text-align: center;
        padding: 50px 0;

        p {
            font-size: 18px;
            margin-bottom: 20px;
            color: #666;
        }
    }

    .cart-items {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 30px;
    }

    .cart-item {
        display: flex;
        align-items: center;
        padding: 15px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        img {
            width: 100px;
            height: 70px;
            object-fit: cover;
            border-radius: 4px;
            margin-right: 20px;
        }

        .item-info {
            flex-grow: 1;

            h3 {
                margin: 0 0 5px 0;
                color: #05386b;
            }

            p {
                margin: 0;
                color: #2a7f2a;
                font-weight: bold;
            }
        }

        .remove-btn {
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.2s;

            &:hover {
                background: #ff5252;
            }
        }
    }

    .cart-summary {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;

        h3 {
            margin: 0;
            color: #05386b;
            font-size: 20px;
        }

        .login-notice {
            color: #dc3545;
            margin: 10px 0 0 0;
            text-align: right;
        }
    }

    @media (max-width: 768px) {
        padding: 15px;

        .cart-item {
            flex-direction: column;
            align-items: flex-start;

            img {
                margin-right: 0;
                margin-bottom: 15px;
                width: 100%;
                height: auto;
                max-height: 200px;
            }
        }

        .cart-summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
        }
    }
`
