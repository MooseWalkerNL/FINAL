import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('role') // сохраняем роль после логина

    if (!token) return <Navigate to="/login" />
    if (allowedRoles && !allowedRoles.includes(userRole))
        return <Navigate to="/403" />

    return children
}

export default PrivateRoute
