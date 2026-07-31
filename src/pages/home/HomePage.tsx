import { Bell, CalendarDays, ChevronRight, FileText, Headphones } from 'lucide-react'
import { Link } from 'react-router-dom'
import homePortraitWoman from '@/assets/home-portrait-female.png'
import homePortraitMan from '@/assets/home-portrait-male.png'
import { announcements } from '@/data/announcements'
import { invitations } from '@/data/invitations'
import { getAuthSession } from '@/lib/auth'

export function HomePage() {
  const session = getAuthSession()
  const userName = session?.user.name ?? 'Paciente'
  const avatarVariant = session?.user.avatarVariant ?? 'female'
  const heroImage = avatarVariant === 'male' ? homePortraitMan : homePortraitWoman
  const featuredInvitation = invitations[0]

  return (
    <main className="page-shell home-dashboard">
      <section className="home-hero-panel">
        <div className="home-hero-copy">
          <p className="eyebrow">Bienestar y acompanamiento</p>
          <h2>Bienvenida, {userName}!</h2>
          <p>
            Este espacio fue creado para acompanarte y mantenerte informada
            durante tu proceso.
          </p>

          <div className="home-hero-benefits">
            <article className="home-benefit-card">
              <span className="home-benefit-icon" aria-hidden="true">
                <FileText size={18} />
              </span>
              <strong>Tu informacion se presenta con claridad</strong>
            </article>
            <article className="home-benefit-card">
              <span className="home-benefit-icon" aria-hidden="true">
                <Bell size={18} />
              </span>
              <strong>Recibe avisos importantes en un solo lugar</strong>
            </article>
          </div>
        </div>

        <div className="home-hero-visual" aria-hidden="true">
          <img src={heroImage} alt="" className="home-hero-image" />
        </div>
      </section>

      <section className="home-summary-strip" aria-label="Resumen general">
        <article className="home-summary-item home-summary-item-teal">
          <span className="home-summary-icon" aria-hidden="true">
            <CalendarDays size={18} />
          </span>
          <strong>{invitations.length}</strong>
          <span>Invitaciones activas</span>
        </article>
        <article className="home-summary-item home-summary-item-amber">
          <span className="home-summary-icon" aria-hidden="true">
            <Bell size={18} />
          </span>
          <strong>{announcements.length}</strong>
          <span>Anuncios recientes</span>
        </article>
        <article className="home-summary-item home-summary-item-blue">
          <span className="home-summary-icon" aria-hidden="true">
            <Headphones size={18} />
          </span>
          <strong>24/7</strong>
          <span>Canales de apoyo</span>
        </article>
      </section>

      <section className="content-block">
        <div className="section-heading">
          <h3>Invitaciones para ti</h3>
          <p>Encuentros y actividades pensadas para acompanarte este mes.</p>
        </div>
        <Link
          to="/invitaciones"
          className="home-featured-invitation"
        >
          <div className="home-featured-icon" aria-hidden="true">
            <CalendarDays size={20} />
          </div>
          <div className="home-featured-copy">
            <strong>{featuredInvitation.title}</strong>
            <p>{featuredInvitation.description}</p>
            <span>Fecha: {featuredInvitation.date}</span>
          </div>
          <ChevronRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </main>
  )
}
