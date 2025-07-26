import styled from 'styled-components'
import { Logo } from '../header/components/logo'

const FooterContainer = ({ className }) => {
    return (
        <div className={className}>
            <div className="footer">
                <div className="contacts">
                    <div>Контакты</div>
                    <a href="+7 (000) 727-29-20">+7 (000) 727-29-20</a>
                </div>
                <div className="about">
                    <div className="contacts">Компания</div>
                    <a href="#">О грузоперевозках</a>
                    <a href="#">Документы</a>
                    <a href="#">Новости</a>
                    <a href="#">Вакансии</a>
                </div>
                <div className="logo">
                    <Logo />
                </div>
            </div>
        </div>
    )
}

export const Footer = styled(FooterContainer)`
    display: flex;

    max-width: 1280px;
    width: 100%;
    font-size: 20px;
    color: white;
    background-color: #05386b;

    .footer {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        width: 100%;
    }

    .contacts {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-weight: 600;
        font-weight: bold;
    }
    .about {
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    .logo {
        display: flex;
        justify-content: center;
    }

    .about {
        justify-content: flex-end;
    }
    a {
        color: white;
        text-decoration: none;
        font-size: 16px;
        margin-top: 8px;
    }
    & a:hover {
        text-decoration: underline;
    }
    .logo {
        display: flex;
        align-items: center;
        font-size: 50px;
    }
    & .logo:hover {
        text-decoration: underline;
    }
`
