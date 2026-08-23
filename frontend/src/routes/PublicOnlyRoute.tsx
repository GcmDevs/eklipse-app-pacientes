import { Navigate, Outlet } from 'react-router-dom'
import { getDefaultRouteForRole, getCurrentUserRole, isAuthenticated } from '@/lib/auth'

export function PublicOnlyRoute() {
  if (isAuthenticated()) {
    return <Navigate to={getDefaultRouteForRole(getCurrentUserRole())} replace />
  }

  return <Outlet />
}
