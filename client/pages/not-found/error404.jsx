import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
    color: #333;
`

const Title = styled.h1`
    font-size: 6rem;
    margin: 0;
`

const Subtitle = styled.p`
    font-size: 1.5rem;
    margin: 20px 0;
`

const HomeLink = styled(Link)`
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`

export const NotFound = () => {
    return (
        <Container>
            <Title>404</Title>
            <Subtitle>Страница не найдена</Subtitle>
            <HomeLink to="/">Вернуться на главную</HomeLink>
        </Container>
    )
}
