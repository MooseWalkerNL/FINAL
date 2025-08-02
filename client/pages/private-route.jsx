import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children, allowedRoles }) {
    const token = localStorage.getItem('token')
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null

    if (!user) return <Navigate to="/login" />
    if (!allowedRoles.includes(user.role)) return <Navigate to="/403" />

    return children
}
