import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const { email, roles, username, user_id, profile } = decoded.UserInfo

        isAdmin = roles.includes('Admin')

        if (isAdmin) status = "Admin"

        return { email, roles, status, isAdmin, username, user_id, profile }
    }

    return { email: '', roles: [], isAdmin, status, username: '', user_id: '', profile: '' }
}
export default useAuth