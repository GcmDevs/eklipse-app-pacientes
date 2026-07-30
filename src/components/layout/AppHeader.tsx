import { Bell, ChevronDown, Menu, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

type AppHeaderProps = {
  pageTitle: string
  userName: string
  initials: string
  onOpenMobileMenu: () => void
  onToggleDesktopSidebar: () => void
  onLogout: () => void
}

export function AppHeader({
  pageTitle,
  userName,
  initials,
  onOpenMobileMenu,
  onToggleDesktopSidebar,
  onLogout,
}: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  return (
    <header className="app-topbar">
      <div className="topbar-leading">
        <button
          type="button"
          className="icon-button mobile-only"
          aria-label="Abrir menu lateral"
          onClick={onOpenMobileMenu}
        >
          <Menu size={20} />
        </button>
        <button
          type="button"
          className="icon-button desktop-only"
          aria-label="Alternar menu lateral"
          onClick={onToggleDesktopSidebar}
        >
          <Menu size={20} />
        </button>
        <div className="topbar-titles">
          <p className="eyebrow">Eklipse Paciente</p>
          <h1>{pageTitle}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <p className="topbar-greeting">Hola, {userName}</p>
        <button
          type="button"
          className="icon-button notifications-button"
          aria-label="Notificaciones"
        >
          <Bell size={18} />
        </button>

        <div className="user-menu" ref={menuRef}>
          <button
            type="button"
            className="user-menu-trigger"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <div className="avatar-badge" aria-hidden="true">
              {initials}
            </div>
            <div className="user-menu-copy">
              <span>{userName}</span>
              <small>Paciente</small>
            </div>
            <ChevronDown size={16} aria-hidden="true" />
          </button>

          {menuOpen ? (
            <div className="user-menu-popover" role="menu">
              <Link
                to="/perfil"
                className="user-menu-item"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                <UserRound size={16} aria-hidden="true" />
                Mi perfil
              </Link>
              <button
                type="button"
                className="user-menu-item user-menu-item-button"
                role="menuitem"
                onClick={onLogout}
              >
                Cerrar sesion
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
