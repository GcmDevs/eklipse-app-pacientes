import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { clearAuthSession, getAuthSession } from '@/lib/auth'
import { AppHeader } from './AppHeader'
import { getPageTitle } from './navigation'
import { Sidebar } from './Sidebar'

export function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const session = getAuthSession()
  const isFocusRoute =
    location.pathname === '/sintomas' || location.pathname === '/estado-animo'

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

  const userName = session?.user.name ?? 'Maria'
  const initials = session?.user.initials ?? 'MR'

  return (
    <div className={isFocusRoute ? 'app-layout app-layout-focus' : 'app-layout'}>
      {isFocusRoute ? null : (
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onToggleCollapse={() => setCollapsed((current) => !current)}
          onCloseMobile={() => setMobileOpen(false)}
          onLogout={handleLogout}
        />
      )}

      <div
        className={
          isFocusRoute
            ? 'app-content app-content-focus'
            : collapsed
              ? 'app-content app-content-wide'
              : 'app-content'
        }
      >
        {isFocusRoute ? null : (
          <AppHeader
            pageTitle={getPageTitle(location.pathname)}
            userName={userName}
            initials={initials}
            onOpenMobileMenu={() => setMobileOpen(true)}
            onToggleDesktopSidebar={() => setCollapsed((current) => !current)}
            onLogout={handleLogout}
          />
        )}

        <div className={isFocusRoute ? 'app-main app-main-focus' : 'app-main'}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
