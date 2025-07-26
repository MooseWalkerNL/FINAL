import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const LogoContainer = ({ className }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }
    return (
        <div className={className}>
            <a onClick={handleClick}>
                <i className="fa fa-truck" aria-hidden="true"></i>
                <div className="logo">Truck-Shop</div>
            </a>
        </div>
    )
}

export const Logo = styled(LogoContainer)`
    display: flex;
    padding: 0 0 0 20px;
    color: white;
    font-size: 35px;
    & .logo {
        margin-left: 20px;
    }
    .fa-truck {
        font-size: 50px;
    }
`
