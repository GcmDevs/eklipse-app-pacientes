import {
  Headset,
  LogOut,
  Sprout,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import type { NavigationItem } from './navigation'

type SidebarProps = {
  mobileOpen: boolean
  navigationItems: NavigationItem[]
  brandTitle: string
  brandSubtitle: string
  badgeCount?: number
  roleLabel: string
  onCloseMobile: () => void
  onLogout: () => void
}

export function Sidebar({
  mobileOpen,
  navigationItems,
  brandTitle,
  brandSubtitle,
  badgeCount = 0,
  roleLabel,
  onCloseMobile,
  onLogout,
}: SidebarProps) {
  return (
    <>
      <div
        className={mobileOpen ? 'drawer-backdrop drawer-backdrop-open' : 'drawer-backdrop'}
        onClick={onCloseMobile}
        aria-hidden="true"
      />
      <aside
        className={mobileOpen ? 'sidebar sidebar-mobile-open' : 'sidebar'}
        aria-label="Navegacion principal"
      >
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <div className="brand-mark brand-mark-small" aria-hidden="true">
              <Sprout size={18} />
            </div>
            <div className="sidebar-brand-copy">
              <strong>{brandTitle}</strong>
              <span>{brandSubtitle}</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navigationItems.map((item) => {
              const Icon = item.icon

              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end
                    title={item.label}
                    className={({ isActive }) =>
                      isActive
                        ? 'sidebar-link sidebar-link-active'
                        : 'sidebar-link'
                    }
                    onClick={onCloseMobile}
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span className="sidebar-link-text">{item.label}</span>
                    {badgeCount > 0 && item.to.includes('/invitaciones') ? (
                      <span className="sidebar-link-badge" aria-hidden="true">
                        {badgeCount}
                      </span>
                    ) : null}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="sidebar-help-card">
            <span className="sidebar-help-icon" aria-hidden="true">
              <Headset size={18} />
            </span>
            <span className="sidebar-help-copy">
              <strong>Necesitas ayuda?</strong>
              <small>{roleLabel === 'Administrador' ? 'Administra y acompana con claridad' : 'Estamos aqui para ti'}</small>
            </span>
          </button>

          <button
            type="button"
            className="sidebar-link sidebar-link-button"
            title="Cerrar sesion"
            onClick={onLogout}
          >
            <span className="sidebar-link-icon-wrap">
              <LogOut size={18} aria-hidden="true" className="logout-icon" />
            </span>
            <span className="sidebar-link-text">Cerrar sesion</span>
          </button>
        </div>
      </aside>
    </>
  )
}
