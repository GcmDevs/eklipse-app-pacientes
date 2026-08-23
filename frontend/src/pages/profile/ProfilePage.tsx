import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  CalendarDays,
  CircleAlert,
  Droplets,
  IdCard,
  Mail,
  MapPinned,
  MapPinHouse,
  Phone,
  PencilLine,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { getCurrentPatient } from '@/lib/auth'

export function ProfilePage() {
  const patient = getCurrentPatient()
  const personalData = [
    ['Tipo de documento', patient.documentType, IdCard],
    ['Numero de documento', patient.documentNumber, IdCard],
    ['Primer nombre', patient.firstName, UserRound],
    ['Segundo nombre', patient.middleName, UserRound],
    ['Primer apellido', patient.lastName, UserRound],
    ['Segundo apellido', patient.secondLastName, UserRound],
  ] as const

  const contactData = [
    ['Correo electronico', patient.email, Mail],
    ['Numero de celular', patient.mobilePhone, Phone],
    ['Telefono alternativo', patient.alternatePhone, Phone],
    ['Direccion', patient.address, MapPinHouse],
    ['Municipio', patient.municipality, MapPinned],
    ['Departamento', patient.department, MapPinned],
  ] as const

  const institutionData = [
    ['Especialidad principal', patient.specialtyLabel, Building2],
    ['Institucion', patient.institution, Building2],
    ['Sede', patient.branch, MapPinned],
    ['Codigo de paciente', patient.patientCode, IdCard],
  ] as const

  return (
    <main className="page-shell profile-page-redesign">
      <section className="profile-hero profile-hero-redesign">
        <div className="profile-hero-main profile-hero-main-redesign">
          <div className="profile-avatar profile-avatar-redesign">{patient.initials}</div>
          <div className="profile-hero-copy-redesign">
            <p className="eyebrow">Perfil del paciente</p>
            <h2>{patient.fullName}</h2>
            <div className="profile-meta profile-meta-pills">
              <span>{patient.roleLabel}</span>
              <span>{patient.institution}</span>
              <span>{patient.branch}</span>
            </div>
            <button type="button" className="ghost-button profile-edit-button">
              <PencilLine size={16} />
              Editar perfil
            </button>
          </div>
        </div>

        <div className="profile-hero-highlights">
          <div className="profile-highlight-item">
            <CalendarDays size={16} />
            <div>
              <strong>Fecha de nacimiento</strong>
              <span>{patient.birthDate}</span>
            </div>
          </div>
          <div className="profile-highlight-item">
            <UserRound size={16} />
            <div>
              <strong>Sexo</strong>
              <span>{patient.sex}</span>
            </div>
          </div>
          <div className="profile-highlight-item">
            <Droplets size={16} />
            <div>
              <strong>Tipo de sangre</strong>
              <span>{patient.bloodType}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="profile-grid profile-grid-redesign">
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

        <section className="profile-note profile-note-redesign">
          <div className="profile-note-illustration" aria-hidden="true">
            <div className="card-icon emergency-icon">
              <CircleAlert size={20} />
            </div>
          </div>
          <div>
            <h3>Informacion importante</h3>
            <p>
              Para actualizar tus datos personales o de contacto, comunicate
              directamente con tu institucion.
            </p>
            <div className="profile-note-callout">
              <strong>Necesitas ayuda?</strong>
              <span>Comunicate con tu institucion para recibir asistencia.</span>
            </div>
            <button type="button" className="primary-button profile-contact-button">
              Contactar institucion
            </button>
          </div>
        </section>
      </div>

      <section className="profile-security-banner">
        <div className="card-icon">
          <ShieldCheck size={18} aria-hidden="true" />
        </div>
        <div>
          <strong>Tu informacion esta protegida</strong>
          <p>En Eklipse Paciente cuidamos la privacidad y seguridad de tus datos.</p>
        </div>
      </section>
    </main>
  )
}

type ProfileSectionProps = {
  icon: LucideIcon
  title: string
  items: readonly (readonly [string, string, LucideIcon])[]
}

function ProfileSection({ icon: Icon, title, items }: ProfileSectionProps) {
  return (
    <section className="profile-section profile-section-redesign">
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
        {items.map(([label, value, ItemIcon]) => (
          <div key={label} className="profile-data-row">
            <dt>
              <span className="profile-data-icon" aria-hidden="true">
                <ItemIcon size={14} />
              </span>
              {label}
            </dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
