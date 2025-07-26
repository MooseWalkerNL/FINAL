import styled from 'styled-components'
import { Card } from './components/card/card'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTrucks } from '../../bff/api/actions/fetch-trucks'
import { H2 } from '../../components/H2'
import { TRUCK_TYPES } from '../../constants/truck-types'

const MainContainer = ({ className }) => {
    const dispatch = useDispatch()
    const [activeType, setActiveType] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        dispatch(fetchTrucks())
    }, [dispatch])

    return (
        <div className={className}>
            <div>
                <H2>Каталог</H2>
                <div className="catalog">
                    <ul>
                        {TRUCK_TYPES.map((type) => (
                            <li
                                key={type.id}
                                className={
                                    activeType === type.id ? 'active' : ''
                                }
                            >
                                <button
                                    onClick={() => setActiveType(type.id)}
                                    className="type-button"
                                >
                                    {type.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="list">
                <div className="search-container">
                    <H2>Список Грузовых Автомобилей</H2>
                    <input
                        type="text"
                        name="search"
                        placeholder="Поиск по названию..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <Card activeType={activeType} searchQuery={searchQuery} />
            </div>
        </div>
    )
}

export const Main = styled(MainContainer)`
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: #edf5e1;

    & .catalog {
        display: flex;
        align-content: start;
        border: 1px solid black;
        width: 350px;
        margin: 15px;
        padding: 20px;
    }

    & .list {
        width: calc(100% - 500px);
        padding-right: 10px;
        display: flex;
        flex-direction: column;
    }

    & li {
        margin-bottom: 15px;
        display: flex;
        align-items: start;
    }

    & .type-button {
        font-size: 25px;
        color: #251e81;
        text-decoration: underline;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        text-align: left;

        &:hover {
            color: #1a1461;
        }
    }

    & li.active .type-button {
        font-weight: bold;
        color: #0d0a3a;
        text-decoration: none;
    }
    .search-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 20px;
    }

    .search-input {
        padding: 10px 15px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        min-width: 500px;
        flex-grow: 1;
        max-width: 400px;

        &:focus {
            outline: none;
            border-color: #05386b;
            box-shadow: 0 0 0 2px rgba(5, 56, 107, 0.2);
        }
    }

    @media (max-width: 768px) {
        .search-container {
            flex-direction: column;
            align-items: stretch;
        }

        .search-input {
            max-width: 100%;
        }
    }
`
