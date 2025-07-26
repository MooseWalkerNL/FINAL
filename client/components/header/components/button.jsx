// src/components/button.jsx
import styled from 'styled-components'

const ButtonContainer = ({ className, children, onClick }) => {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    )
}

export const Button = styled(ButtonContainer)`
    width: 200px;
    height: 50px; // Увеличил высоту для лучшего UX
    background-color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f0f0f0;
    }
`
