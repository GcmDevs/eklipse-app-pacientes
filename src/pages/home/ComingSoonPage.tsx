import type { LucideIcon } from 'lucide-react'

type ComingSoonPageProps = {
  icon: LucideIcon
  title: string
  description: string
}

export function ComingSoonPage({
  icon: Icon,
  title,
  description,
}: ComingSoonPageProps) {
  return (
    <main className="page-shell">
      <section className="module-hero">
        <div className="module-hero-icon">
          <Icon size={24} aria-hidden="true" />
        </div>
        <div className="module-hero-copy">
          <p className="eyebrow">Modulo futuro</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </section>

      <section className="coming-soon-card">
        <strong>Este modulo estara disponible proximamente</strong>
        <p>
          Estamos preparando este espacio para acompanar mejor tu proceso sin
          perder claridad ni facilidad de uso.
        </p>
      </section>
    </main>
  )
}
