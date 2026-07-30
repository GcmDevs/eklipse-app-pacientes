import { PanelLeftClose, PanelLeftOpen, Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navigationItems } from './navigation'

type SidebarProps = {
  collapsed: boolean
  mobileOpen: boolean
  onToggleCollapse: () => void
  onCloseMobile: () => void
  onLogout: () => void
}

export function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
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
        className={
          mobileOpen
            ? 'sidebar sidebar-mobile-open'
            : collapsed
              ? 'sidebar sidebar-collapsed'
              : 'sidebar'
        }
        aria-label="Navegacion principal"
      >
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <div className="brand-mark brand-mark-small" aria-hidden="true">
              <Sparkles size={18} />
            </div>
            <div className={collapsed ? 'sidebar-brand-copy sidebar-brand-copy-hidden' : 'sidebar-brand-copy'}>
              <strong>Eklipse Paciente</strong>
              <span>Seguimiento oncologico</span>
            </div>
          </div>

          <button
            type="button"
            className="icon-button sidebar-toggle desktop-only"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expandir menu lateral' : 'Colapsar menu lateral'}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
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
                    <span className={collapsed ? 'sidebar-link-text sidebar-link-text-hidden' : 'sidebar-link-text'}>
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className="sidebar-link sidebar-link-button"
            title="Cerrar sesion"
            onClick={onLogout}
          >
            <span className="sidebar-link-icon-wrap">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="logout-icon"
              >
                <path
                  d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m16 17 5-5-5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12H9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={collapsed ? 'sidebar-link-text sidebar-link-text-hidden' : 'sidebar-link-text'}>
              Cerrar sesion
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}
