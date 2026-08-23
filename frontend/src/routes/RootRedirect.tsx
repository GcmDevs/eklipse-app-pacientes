import { Navigate } from 'react-router-dom'
import { getDefaultRouteForRole, getCurrentUserRole } from '@/lib/auth'

export function RootRedirect() {
  return <Navigate to={getDefaultRouteForRole(getCurrentUserRole())} replace />
}
