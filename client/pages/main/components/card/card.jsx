import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../../../bff/api/actions/cart-actions'

const CardContainer = ({ className, activeType, searchQuery }) => {
    const dispatch = useDispatch()
    const trucks = useSelector((state) => {
        const allTrucks = state.trucks.trucks || []

        let filteredTrucks =
            activeType === 'all'
                ? allTrucks
                : allTrucks.filter((truck) => truck.type === activeType)

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filteredTrucks = filteredTrucks.filter((truck) =>
                truck.name.toLowerCase().includes(query)
            )
        }

        return {
            ...state.trucks,
            trucks: filteredTrucks,
        }
    })
    const navigate = useNavigate()
    return (
        <div className={className}>
            <div className="trucks-grid">
                {trucks.loading ? (
                    <p>Загрузка...</p>
                ) : trucks.error ? (
                    <p>Ошибка: {trucks.error}</p>
                ) : trucks.trucks.length > 0 ? (
                    trucks.trucks.map((truck) => (
                        <div className="truck-card" key={truck.id}>
                            <img
                                className="truck-image"
                                src={truck.image_url}
                                alt={`Грузовик ${truck.name}`}
                            />
                            <div className="truck-info">
                                <h2>{truck.name}</h2>
                                <p className="type">Тип: {truck.type}</p>
                                <p className="price">Цена: {truck.price}</p>
                                <p className="description">
                                    {truck.description}
                                </p>
                                <div className="truck-actions">
                                    <button
                                        className="view-btn"
                                        onClick={() =>
                                            navigate(`/trucks/${truck.id}`)
                                        }
                                    >
                                        Посмотреть
                                    </button>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() =>
                                            dispatch(addToCart(truck.id))
                                        }
                                    >
                                        В корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Нет доступных грузовиков...</p>
                )}
            </div>
        </div>
    )
}

export const Card = styled(CardContainer)`
    .trucks-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 20px;
        padding: 20px 0;
    }

    .truck-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
    }

    .truck-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .truck-info {
        padding: 15px;

        h2 {
            margin: 0 0 10px 0;
            color: #05386b;
        }

        .type {
            color: #666;
            font-size: 14px;
            margin: 5px 0;
        }

        .price {
            font-weight: bold;
            color: #2a7f2a;
            margin: 5px 0 10px 0;
        }

        .description {
            color: #333;
            margin: 10px 0;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

    button {
        width: 100px;
        padding: 10px;
        background-color: #05386b;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
        margin: 5px;

        &:hover {
            background-color: #042a56;
        }
        p {
            font-size: 55px;
        }
        .truck-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }

        .view-btn,
        .add-to-cart-btn {
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .view-btn {
            background: #05386b;
            color: white;

            &:hover {
                background: #042a56;
            }
        }

        .add-to-cart-btn {
            background: #28a745;
            color: white;

            &:hover {
                background: #218838;
            }
        }
    }
`
