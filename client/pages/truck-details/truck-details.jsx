import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../components/header/components/button'
import { addToCart } from '../../bff/api/actions/cart-actions'

const TruckDetailsContainer = ({ className }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    const truck = useSelector((state) =>
        state.trucks.trucks.find((truck) => String(truck.id) === String(id))
    )

    if (!truck) {
        return <div className={className}>Грузовик не найден</div>
    }

    return (
        <div className={className}>
            <div className="truck-details">
                <div className="image-container">
                    <img src={truck.image_url} alt={truck.name} />
                </div>
                <div className="info-container">
                    <h1>{truck.name}</h1>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Тип:</span>
                            <span>{truck.type}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Цена:</span>
                            <span>{truck.price}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">
                                Дата регистрации:
                            </span>
                            <span>{truck.registered_at}</span>
                        </div>
                    </div>
                    <div className="description">
                        <h3>Описание:</h3>
                        <p>{truck.description}</p>
                    </div>
                    <div className="actions">
                        <Button onClick={() => navigate(-1)}>Назад</Button>
                        <Button
                            onClick={() => {
                                dispatch(addToCart(truck.id))
                                alert('Товар добавлен в корзину!')
                            }}
                            primary
                        >
                            Добавить в корзину
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const TruckDetails = styled(TruckDetailsContainer)`
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;

    .truck-details {
        display: flex;
        gap: 40px;
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    }

    .image-container {
        flex: 1;

        img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            object-fit: cover;
        }
    }

    .info-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;

        h1 {
            color: #05386b;
            margin: 0;
        }
    }

    .details-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin: 20px 0;
    }

    .detail-item {
        display: flex;
        flex-direction: column;

        .detail-label {
            font-weight: bold;
            color: #666;
            margin-bottom: 5px;
        }
    }

    .description {
        h3 {
            margin: 0 0 10px 0;
            color: #05386b;
        }

        p {
            line-height: 1.6;
            color: #333;
        }
    }

    @media (max-width: 768px) {
        padding: 20px;

        .truck-details {
            flex-direction: column;
        }

        .details-grid {
            grid-template-columns: 1fr;
        }
    }
`
