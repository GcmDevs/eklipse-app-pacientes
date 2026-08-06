import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getDefaultRouteForRole, getCurrentUserRole, isAuthenticated } from '@/lib/auth'
import type { UserRole } from '@/types/auth'

type ProtectedRouteProps = {
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  const currentRole = getCurrentUserRole()

  if (allowedRoles && currentRole && !allowedRoles.includes(currentRole)) {
    return <Navigate to={getDefaultRouteForRole(currentRole)} replace />
  }

  return <Outlet />
}
