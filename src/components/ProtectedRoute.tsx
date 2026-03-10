import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../services/auth'
import type { AuthRole } from '../services/auth'

type Props = {
  children: React.ReactNode
  allowedRoles?: AuthRole[]
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const user = getCurrentUser()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'admin') return <Navigate to="/admin" replace />
    if (user.role === 'doctor') return <Navigate to="/doctor" replace />
    return <Navigate to="/patient" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute