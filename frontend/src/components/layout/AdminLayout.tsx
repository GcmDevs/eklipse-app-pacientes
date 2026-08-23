import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AppHeader } from '@/components/layout/AppHeader'
import { Sidebar } from '@/components/layout/Sidebar'
import { clearAuthSession, getAuthSession } from '@/lib/auth'
import { adminNavigationItems, getPageTitle } from './navigation'

export function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const session = getAuthSession()

  useEffect(() => {
    if (!mobileOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [mobileOpen])

  const handleLogout = () => {
    setMobileOpen(false)
    clearAuthSession()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-layout app-layout-admin">
      <Sidebar
        mobileOpen={mobileOpen}
        navigationItems={adminNavigationItems}
        brandTitle="Eklipse Admin"
        brandSubtitle="Seguimiento por especialidad"
        badgeCount={0}
        roleLabel="Administrador"
        onCloseMobile={() => setMobileOpen(false)}
        onLogout={handleLogout}
      />

      <div className="app-content app-content-admin">
        <AppHeader
          appLabel="Eklipse Admin"
          pageTitle={getPageTitle(location.pathname, 'admin')}
          userName={session?.user.name ?? 'Administrador'}
          initials={session?.user.initials ?? 'EA'}
          profilePath="/admin/perfil"
          roleLabel="Administrador"
          onOpenMobileMenu={() => setMobileOpen(true)}
          onLogout={handleLogout}
        />

        <div className="app-main app-main-admin">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
