import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '@/lib/auth'

export function PublicOnlyRoute() {
  if (isAuthenticated()) {
    return <Navigate to="/inicio" replace />
  }

  return <Outlet />
}
