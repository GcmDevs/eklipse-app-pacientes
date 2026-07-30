import type { LucideIcon } from 'lucide-react'
import { Building2, CircleAlert, MapPinned, UserRound } from 'lucide-react'
import { getCurrentPatient } from '@/lib/auth'

export function ProfilePage() {
  const patient = getCurrentPatient()
  const personalData = [
    ['Tipo de documento', patient.documentType],
    ['Numero de documento', patient.documentNumber],
    ['Primer nombre', patient.firstName],
    ['Segundo nombre', patient.middleName],
    ['Primer apellido', patient.lastName],
    ['Segundo apellido', patient.secondLastName],
    ['Fecha de nacimiento', patient.birthDate],
    ['Sexo', patient.sex],
  ] as const

  const contactData = [
    ['Correo electronico', patient.email],
    ['Numero de celular', patient.mobilePhone],
    ['Telefono alternativo', patient.alternatePhone],
    ['Direccion', patient.address],
    ['Municipio', patient.municipality],
    ['Departamento', patient.department],
  ] as const

  const institutionData = [
    ['Institucion', patient.institution],
    ['Sede', patient.branch],
    ['Codigo de paciente', patient.patientCode],
  ] as const

  return (
    <main className="page-shell">
      <section className="profile-hero">
        <div className="profile-hero-main">
          <div className="profile-avatar">{patient.initials}</div>
          <div>
            <p className="eyebrow">Perfil del paciente</p>
            <h2>{patient.fullName}</h2>
            <div className="profile-meta">
              <span>{patient.roleLabel}</span>
              <span>{patient.institution}</span>
              <span>{patient.branch}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="profile-grid">
        <ProfileSection
          icon={UserRound}
          title="Datos personales"
          items={personalData}
        />
        <ProfileSection
          icon={MapPinned}
          title="Datos de contacto"
          items={contactData}
        />
        <ProfileSection
          icon={Building2}
          title="Datos institucionales"
          items={institutionData}
        />
      </div>

      <section className="profile-note">
        <div className="card-icon emergency-icon">
          <CircleAlert size={20} aria-hidden="true" />
        </div>
        <div>
          <h3>Informacion importante</h3>
          <p>
            Para actualizar tus datos personales o de contacto, comunicate
            directamente con la institucion.
          </p>
        </div>
      </section>
    </main>
  )
}

type ProfileSectionProps = {
  icon: LucideIcon
  title: string
  items: readonly (readonly [string, string])[]
}

function ProfileSection({ icon: Icon, title, items }: ProfileSectionProps) {
  return (
    <section className="profile-section">
      <header className="profile-section-header">
        <div className="card-icon">
          <Icon size={18} aria-hidden="true" />
        </div>
        <div>
          <h3>{title}</h3>
          <p>Consulta tu informacion registrada actualmente.</p>
        </div>
      </header>

      <dl className="profile-data-list">
        {items.map(([label, value]) => (
          <div key={label} className="profile-data-row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
