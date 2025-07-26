import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'
import { Main } from './pages/main/main'
import styled from 'styled-components'
import { Authorisation } from './pages/authorisation'
import { Register } from './pages/registration/registration'
import { AuthProvider } from './bff/api/actions/auth-provider'
import { TruckDetails } from './pages/truck-details/truck-details'
import { Cart } from './pages/cart/cart'

const Div = styled.div`
    border: 2px solid black;
`

const Content = ({ children }) => {
    return <div>{children}</div>
}

export const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Div>
                    <Header />
                    <Content>
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/login" element={<Authorisation />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/users"
                                element={<div>Пользователи</div>}
                            />
                            <Route
                                path="/trucks/:id"
                                element={<TruckDetails />}
                            />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="*" element={<div>Ошибка</div>} />
                        </Routes>
                    </Content>
                    <Footer />
                </Div>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
