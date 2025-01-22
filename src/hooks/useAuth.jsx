import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const { email, roles } = decoded.UserInfo

        isAdmin = roles.includes('Admin')

        if (isAdmin) status = "Admin"

        return { email, roles, status, isAdmin }
    }

    return { email: '', roles: [], isAdmin, status }
}
export default useAuth